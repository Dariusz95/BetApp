import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { SingleMatch } from '../interfaces/SingleMatch'

const singleMatch: React.FC<SingleMatch> = ({ match, isExpanded, handleAccordionClick }) => {
  return (
    <Accordion elevation={0} expanded={isExpanded} key={match.id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon onClick={() => handleAccordionClick(match.id)} />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography component={'div'} className='d-flex justify-content-between match'>
          {' '}
          <div className='match__item d-flex justify-content-between'>
            <span>{match.teamA.name}</span>
            <span>{match.teamACourse}</span>
          </div>
          <div className='match__item d-flex justify-content-between'>
            <span>X</span>
            <span>3.30</span>
          </div>
          <div className='match__item d-flex justify-content-between'>
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
