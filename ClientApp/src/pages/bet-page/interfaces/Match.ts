
export interface Match {
    id: string
    teamA: Team
    teamB: Team
    teamACourse:number
    teamBCourse:number
}
export interface Team {
    id: string
    name: string
    imageUrl: string
    power: number
}

export interface IMatchResult {
    counter:string;
    id: string
    teamA: Team
    teamB: Team
    teamAScore:number
    teamBScore:number
}
