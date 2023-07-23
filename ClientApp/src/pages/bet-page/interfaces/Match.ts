export interface Match {
  id: string
  teamA: Team
  teamB: Team
  mainTypes: Record<BetType, number>
  goalTypes: Record<BetType, number>
  betType: BetType
  // betType: '1' | 'X' | '2' | null
}

export enum BetType {
  TeamA = 'TeamA',
  TeamB = 'TeamB',
  Draw = 'Draw',
  None = '0',
  Minus2_5 = '-2.5',
  Plus2_5 = '+2.5',
  Minus3_5 = '-3.5',
  Plus3_5 = '+3.5',
  Minus4_5 = '-4.5',
  Plus4_5 = '+4.5',
}

export interface Team {
  id: string
  name: string
  imageUrl: string
  power: number
}

export interface IMatchResult extends Match {
  counter: string
  teamAScore: number
  teamBScore: number
}

// export enum MainType {
//   TeamA = 'TeamA',
//   TeamB = 'TeamB',
//   Draw = 'Draw',
// }

// export enum GoalType {
//   Minus2_5 = 'minus2_5',
//   Plus2_5 = 'plus2_5',
//   Minus3_5 = 'minus3_5',
//   Plus3_5 = 'plus3_5',
//   Minus4_5 = 'minus4_5',
//   Plus4_5 = 'plus4_5',
// }

export const betTypeLabels: Record<BetType, string> = {
  [BetType.TeamA]: 'Team A',
  [BetType.TeamB]: 'Team B',
  [BetType.Draw]: 'Draw',
  [BetType.None]: 'None',
  [BetType.Minus2_5]: '-2.5',
  [BetType.Plus2_5]: '+2.5',
  [BetType.Minus3_5]: '-3.5',
  [BetType.Plus3_5]: '+3.5',
  [BetType.Minus4_5]: '-4.5',
  [BetType.Plus4_5]: '+4.5',
}


