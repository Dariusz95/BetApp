import React from 'react'
import { IMatchResult } from '../../bet-page/interfaces/Match'

interface MatchResultProps {
  match: IMatchResult
}

const MatchResult: React.FC<MatchResultProps> = ({ match }) => {
  return (
    <div className='match-result'>
      <p>Czas: {match.counter}</p>
      <p>Team A: {match.teamA.name}</p>
      <p>Team B: {match.teamB.name}</p>
      <p>Team A Score: {match.teamAScore}</p>
      <p>Team B Score: {match.teamBScore}</p>
    </div>
  )
}

export default MatchResult
