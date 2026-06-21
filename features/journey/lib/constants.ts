// Chapitres du parcours (provisoire — à condenser/réorienter « ce que je propose »).
export const journeyChapters = [
  { key: 'law', year: '2018' },
  { key: 'asia', year: '2019' },
  { key: 'school42', year: '2022' },
  { key: 'today', year: '2025' },
] as const

export type JourneyChapter = (typeof journeyChapters)[number]
