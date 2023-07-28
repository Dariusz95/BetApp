import React, { useEffect, useRef, useState } from 'react'
import MatchHubConnection from './components/MatchHubConnection'
import { MatchResultProps } from './interfaces/MatchResultProps'
import MatchResultList from './components/MatchResultList/MatchResultList'
import { IMatchResult, IMatchUpdateData } from '../bet-page/interfaces/Match'
import './MatchResultPage.scss'
import Match from './components/Match/Match'

const MatchResultPage: React.FC<MatchResultProps> = ({ matches }) => {
  const [resultMatchesList, setResultMatchesList] = useState<IMatchResult[]>(matches)

  const handleCounterUpdated = (updatedData: IMatchUpdateData) => {
    setResultMatchesList((prevMatches) => {
      return prevMatches.map((match) => {
        if (match.id === updatedData.id) {
          return {
            ...match,
            counter: updatedData.counter,
            teamAScore: updatedData.teamAScore,
            teamBScore: updatedData.teamBScore,
            isOver: updatedData.isOver,
          }
        } else {
          return match
        }
      })
    })
  }

  return (
    <div className='match-result-page w-100 d-flex justify-content-center align-items-center'>
      <div className='d-flex flex-column matches-result'>
        <MatchHubConnection matches={matches} onCounterUpdated={handleCounterUpdated} />
        <ul className='match-result-list m-0 p-0'>
          {resultMatchesList.map((match) => (
            <Match key={match.id} match={match} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MatchResultPage
