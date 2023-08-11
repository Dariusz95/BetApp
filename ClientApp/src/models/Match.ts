export interface Match {
  id: string
  teamA: Team
  teamB: Team
  mainTypes: Record<BetType, number>
  goalTypes: Record<BetType, number>
  betType: BetType
  betCourse?: number
}

export enum BetType {
  TeamA = 'TeamA',
  TeamB = 'TeamB',
  Draw = 'Draw',
  None = 'None',
  Minus2_5 = 'Minus2_5',
  Plus2_5 = 'Plus2_5',
  Minus3_5 = 'Minus3_5',
  Plus3_5 = 'Plus3_5',
  Minus4_5 = 'Minus4_5',
  Plus4_5 = 'Plus4_5',
}

export type MatchRequest = {
  matchId: string
  teamAId: string
  teamBId: string
  betCourse: number
  betType: BetType
}

export interface IMatchResult extends Match {
  counter?: number
  teamAScore?: number
  teamBScore?: number
  isOver?: boolean
  isWin?: boolean
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

export interface IMatchLive {
  id: string
  counter: number
  teamAScore: number
  teamBScore: number
  isOver?: boolean
  isWin?: boolean
}
