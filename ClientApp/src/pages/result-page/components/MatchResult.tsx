import React from 'react'
import { IMatchResult } from '../../bet-page/interfaces/Match'

interface MatchResultProps {
  data: IMatchResult[]
}

const MatchResult: React.FC<MatchResultProps> = ({ data }) => {
  return (
    <div className="match-result">
      {data.map((match) => (
        <div key={match.id}>
          <p>Czas: {match.counter}</p>
          <p>Team A: {match.teamA.name}</p>
          <p>Team B: {match.teamB.name}</p>
          <p>Team A Score: {match.teamAScore}</p>
          <p>Team B Score: {match.teamBScore}</p>
        </div>
      ))}
    </div>
  );
}

export default MatchResult
