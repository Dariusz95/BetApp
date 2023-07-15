import { Match } from '@testing-library/react'
import React, { useState } from 'react'
import { SelectedMatchesModalProps } from '../../interfaces/SingleMatch'
import './SelectedMatchesModal.scss'

const SelectedMatchesModal: React.FC<SelectedMatchesModalProps> = ({ selectedMatches }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleOpenModal = () => {
    setIsModalOpen((prevModalOpen) => !prevModalOpen)
  }
  return (
    <div className={`selected-matches-modal ${isModalOpen ? 'modal-open' : ''}`}>
      <div className='modal-content'>
        {isModalOpen ? (
          <div>
            <button onClick={toggleOpenModal}>X</button>

            <ul>
              {selectedMatches.map((match) => (
                <li key={match.id}>
                  {match.teamA.name} vs. {match.teamB.name} - Twój typ: {match.selected}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className='d-flex justify-content-between flex-column'>
            <div>
              <span>Wybrane mecze </span>
              <span>{selectedMatches.length}</span>
            </div>
            <button className='selected-matches-details-btn' onClick={toggleOpenModal}>
              Zobacz szczegóły
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectedMatchesModal
