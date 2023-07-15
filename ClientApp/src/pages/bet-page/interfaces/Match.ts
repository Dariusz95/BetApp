export interface Match {
  id: string
  teamA: Team
  teamB: Team
  teamACourse: number
  teamBCourse: number
  drawCourse: number
  betType: BetType
  // betType: '1' | 'X' | '2' | null
}

export enum BetType {
  Team1 = '1',
  Draw = 'X',
  Team2 = '2',
  None = '0',
  Plus25 = '+25',
  Minut25 = '-25',
  Plus35 = '+35',
  Minut35 = '-35',
  Plus45 = '+45',
  Minut45 = '-45'
}

export interface Team {
  id: string
  name: string
  imageUrl: string
  power: number
}

export interface IMatchResult extends Match{
  counter: string
  teamAScore: number
  teamBScore: number
} 


// export interface IMatchResult {
//   counter: string
//   id: string
//   teamA: Team
//   teamB: Team
//   teamAScore: number
//   teamBScore: number
// }
