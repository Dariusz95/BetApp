import React, { useEffect, useState } from 'react'
import { IMatchResult } from '../../bet-page/interfaces/Match'

interface MatchProps {
  match: IMatchResult
}

const MatchResult: React.FC<MatchProps> = ({ match }) => {
  const [isGoal, setIsGoal] = useState<boolean>(false)

  useEffect(() => {
    if (match.teamBScore > 0) {
      setIsGoal(true)
      setTimeout(() => {
        setIsGoal(false)
      }, 500)
    }
  }, [match.teamBScore])

  return (
    <div>
      <p>Czas: {match.counter}</p>
      <p>Team A: {match.teamA.name}</p>
      <p>Team B: {match.teamB.name}</p>
      <p>Team A Score: {match.teamAScore}</p>
      <p>Team B Score: {match.teamBScore}</p>
      {isGoal && <p>Bramka!</p>}
    </div>
  )
}
export default MatchResult
