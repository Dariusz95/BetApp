import { BetType } from '../models/Match'

export function checkIfBetIsWin(betType: BetType, teamAScore: number, teamBScore: number) {
  const goalsAmount = (teamAScore || 0) + (teamBScore || 0)

  switch (betType) {
    case BetType.TeamA:
      return teamAScore && teamBScore ? teamAScore > teamBScore : false
      break
    case BetType.TeamB:
      return teamAScore && teamBScore ? teamAScore < teamBScore : false
      break
    case BetType.Draw:
      return teamAScore && teamBScore ? teamAScore === teamBScore : false
      break
    case BetType.Minus2_5:
      return goalsAmount < 2.5
      break
    case BetType.Minus3_5:
      return goalsAmount < 3.5
      break
    case BetType.Minus4_5:
      return goalsAmount < 4.5
      break
    case BetType.Plus2_5:
      return goalsAmount > 2.5
      break
    case BetType.Plus3_5:
      return goalsAmount > 3.5
      break
    case BetType.Plus4_5:
      return goalsAmount > 4.5
      break
    default:
      return false
  }
}
