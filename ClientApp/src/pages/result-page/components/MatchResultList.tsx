import React from 'react'
import { IMatchResult } from '../../bet-page/interfaces/Match'
import MatchResult from './MatchResult'

interface MatchResultListProps {
  resultMatchesList: IMatchResult[]
}

const MatchResultList: React.FC<MatchResultListProps> = ({ resultMatchesList }) => {
  console.log('resultMatchesList', resultMatchesList)
  return (
    <div className='match-result'>
      {resultMatchesList.map((match) => (
        <MatchResult key={match.id} match={match} />
      ))}
    </div>
  )
}

export default MatchResultList