import React from 'react'
import './SelectedMatchesSummarySidebar.scss'
import { Match } from '../../interfaces/Match'
import { getBetTypeText } from '../../../../helpers/getBetTypeText'

export interface MatchSummaryProps {
  match: Match
}

const MatchSummaryElement: React.FC<MatchSummaryProps> = ({ match }) => {
  return (
    <>
      <button className='matches-list__item--removeButton' style={{ width: '10%' }}>
        X
      </button>
      <div className='matches-list__teams d-flex flex-column' style={{ width: '90%' }}>
        <span className='d-flex justify-content-between matches-list__item--bet font-weight-bold py-1'>
          <span>{getBetTypeText(match)}</span>
          <span className='pe-3'>{match.betTypeCourse && match.betTypeCourse}</span>
        </span>
        <span className='d-flex py-1'>
          {match.teamA.name} v {match.teamB.name}
        </span>
      </div>
    </>
  )
}

export default MatchSummaryElement
