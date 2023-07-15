import React, { useEffect, useRef, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { SingleMatch } from '../../interfaces/SingleMatch'
import './SingleMatch.scss'

const singleMatch: React.FC<SingleMatch> = ({
  match,
  isExpanded,
  handleAccordionClick,
  addToSelectedMatches,
}) => {
  const handleSelectType = (selectedType: '1' | 'X' | '2', course: number) => {
    addToSelectedMatches(match, selectedType, course)
  }

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
            onClick={() => handleSelectType('1', match.teamACourse)}
            className={`match__item d-flex justify-content-between ${
              match.selected === '1' ? 'selected' : ''
            }`}
          >
            <span>{match.teamA.name}</span>
            <span>{match.teamACourse}</span>
          </div>
          <div
            onClick={() => handleSelectType('X', match.drawCourse)}
            className={`match__item d-flex justify-content-between ${
              match.selected === 'X' ? 'selected' : ''
            }`}
          >
            <span>X</span>
            <span>3.30</span>
          </div>
          <div
            onClick={() => handleSelectType('2', match.teamBCourse)}
            className={`match__item d-flex justify-content-between ${
              match.selected === '2' ? 'selected' : ''
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
