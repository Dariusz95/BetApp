import React from 'react'
import { BetType, Match } from '../../interfaces/Match'

interface MatchItemProps {
  mainType: { type: BetType; value: number }
  selectedMatch?: Match
  index: number
  handleSelectType: (selectedType: BetType, betCourse: number) => void
}

const GoalTypeItem: React.FC<MatchItemProps> = ({
  mainType,
  selectedMatch,
  index,
  handleSelectType,
}) => {
  const { type, value } = mainType
  const indexType = index % 2 === 0 ? 'even' : 'odd'
  const handleClick = () => {
    handleSelectType(type, value)
  }

  return (
    <div
      onClick={handleClick}
      className={`my-2 col-6 d-flex ${indexType === 'even' ? 'justify-content-end' : ''}`}
    >
      <div
        className={`w-50 d-flex justify-content-between type-item goal-typ-item ${
          selectedMatch?.betType === type ? 'selected' : ''
        }`}
      >
        <span> {type.replace('Minus', '-').replace('Plus', '+').replace('_', '.')}</span>
        <span>{value}</span>
      </div>
    </div>
  )
}

export default GoalTypeItem
