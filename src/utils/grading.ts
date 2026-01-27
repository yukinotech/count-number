export type GradeLabel = '白金' | '黄金' | '白银' | '青铜'

export function getGrade(seconds: number): GradeLabel {
  if (seconds <= 60) return '白金'
  if (seconds <= 120) return '黄金'
  if (seconds <= 180) return '白银'
  return '青铜'
}
