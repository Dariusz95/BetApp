import React from 'react'
import { IMatchResult } from '../../../bet-page/interfaces/Match'
import MatchResult from '../MatchResult/MatchResult'
import './MatchResultList.scss'

interface MatchResultListProps {
  resultMatchesList: IMatchResult[]
}

const MatchResultList: React.FC<MatchResultListProps> = ({ resultMatchesList }) => {
  return (
    <ul className='match-result-list m-0'>
      {resultMatchesList.map((match) => (
        <MatchResult key={match.id} match={match} />
      ))}
    </ul>
  )
}

export default MatchResultList
