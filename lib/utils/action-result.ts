// ================================
// ==        ActionResult        ==
// ================================

// Forme de retour standard des server actions (cohérente dans tout le projet).
export type ActionResult<T = void> = {
  success: boolean
  data?: T
  error?: string
  fieldErrors?: Record<string, string[]>
}

// ===== Helpers =====

export function successResult<T>(data?: T): ActionResult<T> {
  return { success: true, data }
}

export function errorResult(
  error: string,
  fieldErrors?: Record<string, string[]>,
): ActionResult {
  return { success: false, error, fieldErrors }
}
