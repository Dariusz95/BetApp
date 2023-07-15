import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './BetPage.scss'
import { Match, SelectedMatch } from './interfaces/Match'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MatchResultPage from '../result-page/MatchResultPage'
import SingleMatch from './components/SingleMatch/SingleMatch'
import SelectedMatchesModal from './components/SelectedMatchesModal/SelectedMatchesModal'

const BetPage = () => {
  const [matches, setMatches] = useState<Match[]>([])
  const [selectedMatches, setSelectedMatches] = useState<Match[]>([])
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

  const updateSelectedMatches = (updatedMatches: Match[]) => {
    const filteredMatches = updatedMatches.filter((match) => match.selected !== null)
    setSelectedMatches(filteredMatches)
  }

  const selectType = (match: Match, selectedType: '1' | 'X' | '2') => {
    const matchIndex = matches.findIndex((selectedMatch) => selectedMatch.id === match.id)

    if (matchIndex !== -1) {
      const existingMatch = matches[matchIndex]

      if (existingMatch.selected === selectedType) {
        setMatches((prevSelectedMatches) => {
          const updatedMatches = [...prevSelectedMatches]
          updatedMatches[matchIndex].selected = null
          updateSelectedMatches(updatedMatches)
          return updatedMatches
        })
      } else {
        setMatches((prevSelectedMatches) => {
          const updatedMatches = [...prevSelectedMatches]
          updatedMatches[matchIndex].selected = selectedType
          updateSelectedMatches(updatedMatches)
          return updatedMatches
        })
      }
    }
  }
  // const addToSelectedMatches = (match: Match, selectedType: '1' | 'X' | '2', course: number) => {
  //   const matchIndex = selectedMatches.findIndex((selectedMatch) => selectedMatch.id === match.id)

  //   if (matchIndex !== -1) {
  //     const existingMatch = selectedMatches[matchIndex]
  //     if (existingMatch.selected === selectedType) {
  //       setSelectedMatches((prevSelectedMatches) => {
  //         const updatedMatches = [...prevSelectedMatches]
  //         updatedMatches.splice(matchIndex, 1)
  //         return updatedMatches
  //       })
  //       return
  //     }
  //   }

  //   if (matchIndex !== -1) {
  //     const existingMatch = selectedMatches[matchIndex]
  //     if (existingMatch.selected === selectedType) {
  //       setSelectedMatches((prevSelectedMatches) => {
  //         const updatedMatches = [...prevSelectedMatches]
  //         updatedMatches.splice(matchIndex, 1)
  //         return updatedMatches
  //       })
  //       return
  //     } else {
  //       setSelectedMatches((prevSelectedMatches) => {
  //         const updatedMatches = [...prevSelectedMatches]
  //         const selectedMatch = updatedMatches[matchIndex]
  //         selectedMatch.course = course
  //         selectedMatch.selected = selectedType
  //         return updatedMatches
  //       })
  //     }
  //   } else {
  //     const selectedMatch: SelectedMatch = {
  //       id: match.id,
  //       teamA: match.teamA,
  //       teamB: match.teamB,
  //       course: course,
  //       selected: selectedType,
  //     }

  //     setSelectedMatches((prevSelectedMatches) => [...prevSelectedMatches, selectedMatch])
  //   }
  // }

  const fetchMatches = () => {
    axios
      .get<Match[]>('https://localhost:8000/api/match')
      .then((response) => {
        const matchesData = response.data.map((match) => ({ ...match, selected: null }))
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
                addToSelectedMatches={selectType}
              />
            ))}
          </div>
          <MatchResultPage matches={matches}></MatchResultPage>
        </div>
      </div>
      {selectedMatches.length > 0 && <SelectedMatchesModal selectedMatches={selectedMatches} />}
    </div>
  )
}

export default BetPage
