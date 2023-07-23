import React from 'react'
import { BetType, Match } from '../../interfaces/Match'

interface MainTypesProps {
  match: Match
  selectedMatch?: Match
  handleSelectType: (selectedType: BetType) => void
}

const MainTypes: React.FC<MainTypesProps> = ({ match, selectedMatch, handleSelectType }) => {
  return (
    <>
      <div
        onClick={() => handleSelectType(BetType.TeamA)}
        className={`type-item d-flex justify-content-between ${
          selectedMatch?.betType === BetType.TeamA ? 'selected' : ''
        }`}
      >
        <span>{match.teamA.name}</span>
        <span>{match.mainTypes[BetType.TeamA]}</span>
      </div>
      <div
        onClick={() => handleSelectType(BetType.Draw)}
        className={`type-item d-flex justify-content-between ${
          selectedMatch?.betType === BetType.Draw ? 'selected' : ''
        }`}
      >
        <span>X</span>
        <span>{match.mainTypes[BetType.Draw]}</span>
      </div>
      <div
        onClick={() => handleSelectType(BetType.TeamB)}
        className={`type-item d-flex justify-content-between ${
          selectedMatch?.betType === BetType.TeamB ? 'selected' : ''
        }`}
      >
        <span>{match.teamB.name}</span>
        <span>{match.mainTypes[BetType.TeamB]}</span>
      </div>
    </>
  )
}

export default MainTypes
