import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './BetPage.scss'
import { BetType, Match } from '../../models/Match'
import SingleMatch from './components/SingleMatch/SingleMatch'
import SelectedMatchesModal from './components/SelectedMatchesModal/SelectedMatchesModal'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedMatch } from '../../store/matchSlice'
import { RootState } from '../../store/store'
import SelectedMatchesSummarySidebar from './components/SelectedMatchesSummarySidebar/SelectedMatchesSummarySidebar'
import MediaQuery from 'react-responsive'

const BetPage = () => {
  const [matches, setMatches] = useState<Match[]>([])
  const [expand, setExpand] = useState({} as { [key: string]: boolean })
  const dispatch = useDispatch()
  const selectedMatches = useSelector((state: RootState) => state.selectedMatches.selectedMatches)
  const [totalBetTypeCourse, setTotalBetTypeCourse] = useState(1)

  const calculateTotalBetTypeCourse = (matches: Match[]) => {
    const totalCourse = matches.reduce((acc, match) => acc * (match.betCourse || 1), 1)
    return totalCourse
  }

  useEffect(() => {
    const newTotalBetTypeCourse = calculateTotalBetTypeCourse(selectedMatches)
    setTotalBetTypeCourse(newTotalBetTypeCourse)
  }, [selectedMatches])

  useEffect(() => {
    fetchMatches()
  }, [])

  const handleAccordionClick = (id: string) => {
    setExpand((prevExpand) => ({
      ...prevExpand,
      [id]: !prevExpand[id],
    }))
  }

  const selectType = (match: Match) => {
    dispatch(updateSelectedMatch({ match }))
  }

  const fetchMatches = () => {
    axios
      .get<Match[]>('https://localhost:8000/api/match')
      .then((response) => {
        const matchesData = response.data.map((match) => ({
          ...match,
          betType: BetType.None,
        }))
        setMatches(matchesData)
        setExpand((prevExpand) => {
          const matchsWithBoolean: { [key: string]: boolean } = {}
          matchesData.forEach((match) => {
            matchsWithBoolean[match.id] = false
          })
          return { ...prevExpand, ...matchsWithBoolean }
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className='bet-page d-flex flex-column'>
      <div className='container'>
        <div className='bet-page__match-container'>
          <div className='matches-area d-flex flex-column align-items-center w-100'>
            <h2>Lista meczy</h2>
            <div className='matches w-100'>
              {matches.map((match) => (
                <SingleMatch
                  match={match}
                  isExpanded={expand[match.id]}
                  handleAccordionClick={handleAccordionClick}
                  key={match.id}
                  addToSelectedMatches={selectType}
                  selectedMatch={selectedMatches.find(
                    (selectedMatch) => selectedMatch.id === match.id,
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <MediaQuery minWidth={1224}>
        <SelectedMatchesSummarySidebar
          selectedMatches={selectedMatches}
          totalBetTypeCourse={totalBetTypeCourse}
        />
      </MediaQuery>

      {/* <MediaQuery maxWidth={1224}>
        {selectedMatches.length > 0 && <SelectedMatchesModal selectedMatches={selectedMatches} />}
      </MediaQuery> */}
    </div>
  )
}

export default BetPage
