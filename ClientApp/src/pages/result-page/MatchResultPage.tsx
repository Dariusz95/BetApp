import React, { useEffect, useRef, useState } from 'react';
import MatchHubConnection from './components/MatchHubConnection';
import { MatchResultProps } from './interfaces/MatchResultProps';
import MatchResultList from './components/MatchResultList'
import { IMatchResult, Match } from '../bet-page/interfaces/Match'
import './MatchResultPage.scss'

const MatchResultPage: React.FC<MatchResultProps> = ({ matches }) => {
  const [resultMatchesList, setResultMatchesList] = useState<IMatchResult[]>([])
  const handleCounterUpdated = (updatedData: IMatchResult) => {
    setResultMatchesList((prevData) => {
      const existingMatchIndex = prevData.findIndex((match) => match.id === updatedData.id)

      if (existingMatchIndex !== -1) {
        prevData[existingMatchIndex] = updatedData
        return [...prevData]
      } else {
        return [...prevData, updatedData]
      }
    })
  }

  return (
    <div className='match-result-page w-100 d-flex justify-content-center align-items-center'>
      <div className='d-flex'>
        <MatchHubConnection matches={matches} onCounterUpdated={handleCounterUpdated} />
        {resultMatchesList && <MatchResultList resultMatchesList={resultMatchesList} />}
      </div>
    </div>
  )
}

export default MatchResultPage;