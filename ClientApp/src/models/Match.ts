export interface Match {
  id: string
  teamA: Team
  teamB: Team
  mainTypes: Record<BetType, number>
  goalTypes: Record<BetType, number>
  betType: BetType
  betTypeCourse?: number
}

export enum BetType {
  TeamA = 'TeamA',
  TeamB = 'TeamB',
  Draw = 'Draw',
  None = '0',
  Minus2_5 = 'Minus2_5',
  Plus2_5 = 'Plus2_5',
  Minus3_5 = 'Minus3_5',
  Plus3_5 = 'Plus3_5',
  Minus4_5 = 'Minus4_5',
  Plus4_5 = 'Plus4_5',
}

export interface IMatchResult extends Match {
  counter?: number
  teamAScore?: number
  teamBScore?: number
  isOver?: boolean
  isBetWin?: boolean
}

export interface MainTypes {
  goalTypes: Record<BetType, number>
}

export interface Team {
  id: string
  name: string
  power: number
  imageUrl: string
}

export interface IMatchUpdateData {
  id: string
  counter: number
  teamAScore: number
  teamBScore: number
  isOver?: boolean
}
