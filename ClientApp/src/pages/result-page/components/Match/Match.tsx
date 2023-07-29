import React, { useEffect, useState } from 'react'
import { BetType, IMatchResult, Match } from '../../../bet-page/interfaces/Match'
import './Match.scss'
import { checkIfBetIsWin } from '../../../../helpers/checkIfBetIsWin'
import MatchTeam from './MatchTeam'
import { getBetTypeText } from '../../../../helpers/getBetTypeText'

interface MatchProps {
  match: IMatchResult
}

const MatchResult: React.FC<MatchProps> = ({ match }) => {
  const { counter: matchCounter, teamAScore, teamBScore, isOver } = match
  const { name: teamAName, imageUrl: teamAImageUrl } = match.teamA
  const { name: teamBName, imageUrl: teamBImageUrl } = match.teamB

  const [isBetWin, setIsBetWin] = useState<boolean | null>(null)

  useEffect(() => {
    if (isOver && match.teamAScore !== undefined && match.teamBScore !== undefined) {
      setIsBetWin(checkIfBetIsWin(match.betType, match.teamAScore, match.teamBScore))
    }
  }, [isOver, teamAScore, teamBScore, match.betType])

  return (
    <li className={`result d-flex py-2 ${isOver ? (isBetWin ? 'is-win' : 'is-loss') : ''}`}>
      {isOver !== undefined && (
        <span className='result__time d-flex align-items-center px-2'>
          {isOver ? 'koniec' : `${matchCounter}'`}
        </span>
      )}
      <div className='d-flex flex-column px-2 w-50'>
        <MatchTeam teamName={teamAName} teamImageUrl={teamAImageUrl} teamScore={teamAScore} />
        <MatchTeam teamName={teamBName} teamImageUrl={teamBImageUrl} teamScore={teamBScore} />
      </div>
      <div className='result__betInfo d-flex align-items-center justify-content-between px-2 font-weight-bold w-100'>
        <span>{getBetTypeText(match)}</span>
        <span>{match.betTypeCourse}</span>
      </div>
    </li>
  )
}

export default MatchResult
