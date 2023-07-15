export interface Match {
  id: string
  teamA: Team
  teamB: Team
  teamACourse: number
  teamBCourse: number
  drawCourse: number
  selected: '1' | 'X' | '2' | null
}

export interface SelectedMatch {
  id: string
  teamA: Team
  teamB: Team
  course: number
  selected: '1' | 'X' | '2' | null
}

export interface Team {
  id: string
  name: string
  imageUrl: string
  power: number
}

export interface IMatchResult {
  counter: string
  id: string
  teamA: Team
  teamB: Team
  teamAScore: number
  teamBScore: number
}
