import React, { useEffect, useState } from 'react'
import './SelectedMatchesSummarySidebar.scss'
import { SelectedMatchesModalProps } from '../../interfaces/SingleMatch'
import MatchSummaryElement from './MatchSummaryElement'
import { Match } from '../../../../models/Match'
import { Link } from 'react-router-dom'

const SelectedMatchesSummarySidebar: React.FC<SelectedMatchesModalProps> = ({
  selectedMatches,
  totalBetTypeCourse,
}) => {
  const [betValue, setBetValue] = useState(0)

  return (
    <div className='selected-matches-sidebar'>
      <div className='sidebar-content w-100'>
        <div className='sidebar-content__header w-100 p-2'>
          <h5>Twoje typy</h5>
        </div>
        <ul className='matches-list py-2 m-0'>
          {selectedMatches.map((match) => (
            <li className='matches-list__item my-2 d-flex' key={match.id}>
              <MatchSummaryElement match={match} />
            </li>
          ))}
        </ul>
        <div className='sidebar-content__betValue d-flex flex-column align-items-end p-2'>
          <input
            type='number'
            className='form-control w-25'
            required
            onChange={(e) => setBetValue(Number(e.target.value))}
          />
          <span>Łączny kurs: {totalBetTypeCourse.toFixed(2)}</span>
          <span>Potencjalna wygrana: {(betValue * totalBetTypeCourse).toFixed(2)}</span>
        </div>
        <Link
          state={{
            betValue: betValue,
            potentialWin: (betValue * totalBetTypeCourse).toFixed(2),
          }}
          to='/result'
          className={
            'sidebar-content__bet result-button d-flex justify-content-center w-100 ' +
            (betValue === 0 ? 'disabled-link' : '')
          }
        >
          Postaw kupon
        </Link>
      </div>
    </div>
  )
}

export default SelectedMatchesSummarySidebar
