import React, { useEffect, useRef, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { SingleMatch } from '../../interfaces/SingleMatch'
import './SingleMatch.scss'
import { BetType } from '../../interfaces/Match'
import MatchItem from './GoalTypeItem'
import GoalTypeItem from './GoalTypeItem'
import MainTypes from './MainTypes'

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
  return (
    <Accordion elevation={0} expanded={isExpanded} key={match.id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon onClick={() => handleAccordionClick(match.id)} />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography component={'div'} className='d-flex justify-content-between match'>
          {' '}
          <MainTypes
            match={match}
            selectedMatch={selectedMatch}
            handleSelectType={handleSelectType}
          />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component={'div'} className='d-flex goal-types row'>
          {' '}
          {Object.entries(match.goalTypes).map(([type, value], index) => (
            <GoalTypeItem
              key={type}
              selectedMatch={selectedMatch}
              mainType={{ type: type as BetType, value }}
              handleSelectType={handleSelectType}
              index={index}
            />
          ))}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default singleMatch
