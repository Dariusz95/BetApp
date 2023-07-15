import React from 'react'
import { IMatchResult } from '../../bet-page/interfaces/Match'
import MatchResult from './MatchResult'

interface MatchResultProps {
  data: IMatchResult[]
}

const MatchResultList: React.FC<MatchResultProps> = ({ data }) => {
  return (
    <div className='match-result'>
      {data.map((match) => (
        <MatchResult key={match.id} match={match} />
      ))}
    </div>
  )
}

export default MatchResultList
