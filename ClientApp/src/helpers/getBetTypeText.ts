import { BetType, Match } from '../models/Match'

export function getBetTypeText(match: Match): string {
  switch (match.betType) {
    case BetType.TeamA:
      return match.teamA.name
    case BetType.TeamB:
      return match.teamB.name
    case BetType.Draw:
      return 'Remis'
    case BetType.None:
      return '0'
    case BetType.Minus2_5:
      return '-2.5'
    case BetType.Plus2_5:
      return '+2.5'
    case BetType.Minus3_5:
      return '-3.5'
    case BetType.Plus3_5:
      return '+3.5'
    case BetType.Minus4_5:
      return '-4.5'
    case BetType.Plus4_5:
      return '+4.5'
    default:
      return ''
  }
}
