import React from 'react'
import { IMatchResult } from '../../../bet-page/interfaces/Match'
import './MatchResult.scss'

interface MatchResultProps {
  match: IMatchResult
}

const MatchResult: React.FC<MatchResultProps> = ({ match }) => {
  const { counter: matchCounter, teamAScore, teamBScore } = match
  const { name: teamAName, imageUrl: teamAImageUrl } = match.teamA
  const { name: teamBName, imageUrl: teamBImageUrl } = match.teamB

  return (
    <li className='single-match-result d-flex py-2'>
      <span className='single-match-result__time w-15 px-1'>{matchCounter}</span>
      <span className='single-match-result__status pe-2 w-15'>live</span>
      <div className='single-match-result__match d-flex'>
        <div className='single-match-result__team d-flex'>
          <p className='single-match-result__match--name  font-weight-bold m-0 px-2'>{teamAName}</p>
          <img
            src={teamAImageUrl}
            className='single-match-result__match--thumbnail'
            style={{ maxWidth: '25px', maxHeight: '25px' }}
          />
        </div>
        <p className='single-match-result__match--score m-0 px-2'>
          {teamAScore} : {teamBScore}
        </p>
        <div className='single-match-result__team d-flex'>
          <img
            src={teamBImageUrl}
            className='single-match-result__match--thumbnail'
            style={{ maxWidth: '25px', maxHeight: '25px' }}
          />
          <p className='single-match-result__match--name  font-weight-bold m-0 px-2'>{teamBName}</p>
        </div>
      </div>
    </li>
  )
}

export default MatchResult
