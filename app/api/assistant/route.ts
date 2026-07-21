import Anthropic from '@anthropic-ai/sdk'
import {
  HISTORY_MAX_MESSAGES,
  HISTORY_MESSAGE_MAX_CHARS,
  QUESTION_MAX_CHARS,
  checkGlobalBudget,
  checkRateLimit,
} from '@/features/assistant/guards'
import {
  ASSISTANT_MODEL,
  MAX_RESPONSE_TOKENS,
  buildSystemPrompt,
} from '@/features/assistant/prompt'
import { sendVisitorMessage } from '@/features/assistant/send-message'

export const runtime = 'nodejs'

// ===== Outil du bot : transmettre un message à Thibault =====

const SEND_TOOL: Anthropic.Tool = {
  name: 'send_message',
  description:
    "Transmet le message d'un visiteur à Thibault par email. À n'utiliser qu'avec l'accord explicite du visiteur, une fois son email et son message connus.",
  input_schema: {
    type: 'object',
    properties: {
      visitor_email: {
        type: 'string',
        description: 'Email du visiteur, pour que Thibault puisse lui répondre',
      },
      message: {
        type: 'string',
        description: "Le message du visiteur, fidèle à ce qu'il a demandé de transmettre",
      },
    },
    required: ['visitor_email', 'message'],
  },
}

// ===== Validation de l'entrée =====

type ChatMessage = { role: 'user' | 'assistant'; content: string }

function isChatMessage(m: unknown): m is ChatMessage {
  if (typeof m !== 'object' || m === null) return false
  const { role, content } = m as Record<string, unknown>
  return (
    (role === 'user' || role === 'assistant') &&
    typeof content === 'string' &&
    content.trim().length > 0
  )
}

/** Ne garde que des paires user→assistant complètes, en partant de la fin
    (l'API Anthropic exige l'alternance des rôles), retronquées côté serveur. */
function sanitizeHistory(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return []
  const clean = raw
    .filter(isChatMessage)
    .map((m) => ({ role: m.role, content: m.content.slice(0, HISTORY_MESSAGE_MAX_CHARS) }))
  const pairs: ChatMessage[] = []
  for (let i = clean.length - 1; i > 0 && pairs.length < HISTORY_MAX_MESSAGES; i -= 1) {
    if (clean[i].role === 'assistant' && clean[i - 1].role === 'user') {
      pairs.unshift(clean[i - 1], clean[i])
      i -= 1
    }
  }
  return pairs
}

// ===== POST /api/assistant =====

export async function POST(req: Request) {
  // 1. Corps + validation — gratuit, avant tout accès réseau
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  const question = typeof body?.question === 'string' ? body.question.trim() : ''
  const locale = body?.locale === 'en' ? 'en' : 'fr'
  if (!question || question.length > QUESTION_MAX_CHARS) {
    return Response.json({ errorKey: 'invalid' }, { status: 400 })
  }
  const history = sanitizeHistory(body?.history)

  // 2. Rate limit par IP (x-real-ip = header calculé par Vercel)
  const ip =
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  const rate = await checkRateLimit(ip)
  if (!rate.ok) return Response.json({ errorKey: rate.errorKey }, { status: rate.status })

  // 3. Budget global jour/mois — LE plafond de dépense
  const budget = await checkGlobalBudget()
  if (!budget.ok) {
    return Response.json({ errorKey: budget.errorKey }, { status: budget.status })
  }

  // 4. Clé absente → erreur propre (précédent : formulaire contact)
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ errorKey: 'server' }, { status: 503 })
  }

  // 5. Stream Claude → texte brut (le client lit des chunks, rien à parser).
  //    Boucle agentique : si Claude appelle send_message, on exécute l'outil puis
  //    on relance un stream avec le tool_result pour qu'il confirme au visiteur.
  const anthropic = new Anthropic()
  const system = buildSystemPrompt(locale)
  const baseMessages: Anthropic.MessageParam[] = [
    ...history,
    { role: 'user', content: question },
  ]

  const encoder = new TextEncoder()
  let activeStream: { abort(): void } | null = null

  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      const streamInto = async (messages: Anthropic.MessageParam[]) => {
        const stream = anthropic.messages.stream({
          model: ASSISTANT_MODEL,
          max_tokens: MAX_RESPONSE_TOKENS,
          system,
          tools: [SEND_TOOL],
          messages,
        })
        activeStream = stream
        let emitted = false
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text))
            emitted = true
          }
        }
        return { final: await stream.finalMessage(), emitted }
      }

      try {
        const { final, emitted } = await streamInto(baseMessages)
        const toolUse =
          final.stop_reason === 'tool_use'
            ? final.content.find((b) => b.type === 'tool_use')
            : undefined
        if (toolUse) {
          const result = await sendVisitorMessage(toolUse.input)
          // le texte pré-outil et la confirmation post-outil sont deux paragraphes
          if (emitted) controller.enqueue(encoder.encode('\n\n'))
          await streamInto([
            ...baseMessages,
            { role: 'assistant', content: final.content },
            {
              role: 'user',
              content: [{ type: 'tool_result', tool_use_id: toolUse.id, content: result }],
            },
          ])
        }
        controller.close()
      } catch {
        controller.error(new Error('assistant stream failed'))
      }
    },
    // Palette fermée en cours de réponse → on coupe la génération (et son coût)
    cancel() {
      activeStream?.abort()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}
