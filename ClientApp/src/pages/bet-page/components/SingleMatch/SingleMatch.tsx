import React, { useEffect, useRef, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { SingleMatch } from '../../interfaces/SingleMatch'
import './SingleMatch.scss'
import { BetType } from '../../interfaces/Match'

const singleMatch: React.FC<SingleMatch> = ({
  match,
  isExpanded,
  handleAccordionClick,
  addToSelectedMatches,
  selectedMatch,
}) => {
  const handleSelectType = (selectedType: BetType) => {
    const updatedMatch = { ...match, betType: selectedType }
    addToSelectedMatches(updatedMatch)
  }
  console.log(selectedMatch)
  return (
    <Accordion elevation={0} expanded={isExpanded} key={match.id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon onClick={() => handleAccordionClick(match.id)} />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography component={'div'} className='d-flex justify-content-between match'>
          {' '}
          <div
            onClick={() => handleSelectType(BetType.Team1)}
            className={`match__item d-flex justify-content-between ${
              selectedMatch?.betType === BetType.Team1 ? 'selected' : ''
            }`}
          >
            <span>{match.teamA.name}</span>
            <span>{match.teamACourse}</span>
          </div>
          <div
            onClick={() => handleSelectType(BetType.Draw)}
            className={`match__item d-flex justify-content-between ${
              selectedMatch?.betType === BetType.Draw ? 'selected' : ''
            }`}
          >
            <span>X</span>
            <span>3.30</span>
          </div>
          <div
            onClick={() => handleSelectType(BetType.Team2)}
            className={`match__item d-flex justify-content-between ${
              selectedMatch?.betType === BetType.Team2 ? 'selected' : ''
            }`}
          >
            <span>{match.teamB.name}</span>
            <span>{match.teamBCourse}</span>
          </div>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Reszta meczy</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default singleMatch
