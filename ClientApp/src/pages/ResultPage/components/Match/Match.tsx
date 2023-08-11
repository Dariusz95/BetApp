import React, { useEffect, useState } from 'react'
import './Match.scss'
import MatchTeam from './MatchTeam'
import { getBetTypeText } from '../../../../helpers/getBetTypeText'
import { IMatchResult } from '../../../../models/Match'

interface MatchProps {
  match: IMatchResult
}

const MatchResult: React.FC<MatchProps> = ({ match }) => {
  const { counter: matchCounter, teamAScore, teamBScore, isOver, isWin: isBetWin } = match
  const { name: teamAName, imageUrl: teamAImageUrl } = match.teamA
  const { name: teamBName, imageUrl: teamBImageUrl } = match.teamB

  return (
    <li className={`result d-flex py-2 ${isOver ? (isBetWin ? 'is-win' : 'is-loss') : ''}`}>
      {isOver !== undefined && (
        <span className='result__time d-flex align-items-center px-2'>
          {isOver ? 'koniec' : `${matchCounter}'`}
        </span>
      )}
      <div className='result__match d-flex flex-column px-2'>
        <MatchTeam teamName={teamAName} teamImageUrl={teamAImageUrl} teamScore={teamAScore} />
        <MatchTeam teamName={teamBName} teamImageUrl={teamBImageUrl} teamScore={teamBScore} />
      </div>
      <div className='result__betInfo d-flex align-items-center justify-content-between px-2 font-weight-bold w-100'>
        <span>{getBetTypeText(match)}</span>
        <span>{match.betCourse}</span>
      </div>
    </li>
  )
}

export default MatchResult
