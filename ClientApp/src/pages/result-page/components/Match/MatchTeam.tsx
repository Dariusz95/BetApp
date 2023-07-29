import React, { useEffect, useRef, useState } from 'react'
import './Match.scss'

interface MatchTeamProps {
  teamName: string
  teamImageUrl: string
  teamScore?: number
}

const MatchTeam: React.FC<MatchTeamProps> = ({ teamName, teamImageUrl, teamScore }) => {
  return (
    <div className='result__team d-flex justify-content-between my-1'>
      <div className='d-flex'>
        <img
          src={teamImageUrl}
          className='result__team--thumbnail'
          style={{ width: '25px', height: '25px' }}
        />
        <p className='result__team--name  font-weight-bold m-0 px-2'>{teamName}</p>
      </div>
      <span>{teamScore}</span>
    </div>
  )
}

export default MatchTeam
