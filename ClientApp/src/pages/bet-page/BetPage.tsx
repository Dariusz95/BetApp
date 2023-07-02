import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './BetPage.scss'
import { Match } from './interfaces/Match'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MatchResultPage from '../result-page/MatchResultPage'
import SingleMatch from './components/singleMatch'

const BetPage = () => {
  const [matches, setMatches] = useState<Match[]>([])
  const [data, setData] = useState<any>(null)
  const [expand, setExpand] = useState({} as { [key: string]: boolean })

  useEffect(() => {
    fetchMatches()
  }, [])

  const handleAccordionClick = (id: string) => {
    setExpand((prevExpand) => ({
      ...prevExpand,
      [id]: !prevExpand[id],
    }))
  }

  const fetchMatches = () => {
    axios
      .get<Match[]>('https://localhost:8000/api/match')
      .then((response) => {
        const matchesData = response.data
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
    <div className='bet-page'>
      <div className='bet-page__match-container container'>
        <div className='matches-area d-flex flex-column align-items-center w-100'>
          <h2>Lista meczy</h2>
          <div className='matches w-100'>
            {matches.map((match) => (
              <SingleMatch
                match={match}
                isExpanded={expand[match.id]}
                handleAccordionClick={handleAccordionClick}
                key={match.id}
              />
            ))}
          </div>
          <MatchResultPage matches={matches}></MatchResultPage>
        </div>
      </div>
    </div>
  )
}

export default BetPage
