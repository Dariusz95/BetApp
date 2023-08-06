import React, { useEffect, useRef, useState } from 'react'
import MatchHubConnection from './components/MatchHubConnection'
import { MatchResultProps } from './interfaces/MatchResultProps'
import './MatchResultPage.scss'
import Match from './components/Match/Match'
import { useLocation } from 'react-router-dom'
import { checkIfBetIsWin } from '../../helpers/checkIfBetIsWin'
import ResultModal from './components/ResultModal/ResultModal'
import Confetti from 'react-confetti'
import { IMatchResult, IMatchUpdateData } from '../../models/Match'
import { MatchRequest } from '../../api/MatchRequest'

const MatchResultPage: React.FC<MatchResultProps> = ({ matches }) => {
  const [resultMatchesList, setResultMatchesList] = useState<IMatchResult[]>(matches)
  const [endedMatches, setEndedMatches] = useState<number>(0)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isBetWin, setIsBetWin] = useState(false)
  const [potentialWin, setPotentialWin] = useState(0)
  const location = useLocation()
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setPotentialWin(location.state.potentialWin)
  }, [location.state.potentialWin])

  useEffect(() => {
    checkAllMatchesEnded()
  }, [endedMatches])

  const checkAllMatchesEnded = () => {
    if (endedMatches === resultMatchesList.length) {
      const updatedMatchesList = resultMatchesList.map((match) => {
        const isMatchWin = checkIfBetIsWin(match.betType, match.teamAScore!, match.teamBScore!)
        return { ...match, isBetWin: isMatchWin }
      })
      // setResultMatchesList(updatedMatchesList)
      // MatchRequest.AddCoupon(updatedMatchesList)
      //   .then((response) => {
      //     console.log(response)
      //   })
      //   .catch((error) => console.error('Error:', error))

      const allBetWin = updatedMatchesList.every((match) => match.isBetWin === true)
      setIsOpenModal(true)
      setIsBetWin(allBetWin)
      setShowConfetti(allBetWin)
    }
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleMatchUpdated = (updatedData: IMatchUpdateData) => {
    setResultMatchesList((prevMatches) => {
      return prevMatches.map((match) => {
        if (match.id === updatedData.id) {
          return {
            ...match,
            counter: updatedData.counter,
            teamAScore: updatedData.teamAScore,
            teamBScore: updatedData.teamBScore,
            isOver: updatedData.isOver,
          }
        } else {
          return match
        }
      })
    })
  }

  const handleIncrement = () => {
    setEndedMatches((prevValue) => prevValue + 1)
  }

  const onMatchFinish = (matchFinishData: IMatchUpdateData) => {
    handleIncrement()
    setResultMatchesList((prevMatches) => {
      return prevMatches.map((match) => {
        if (match.id === matchFinishData.id) {
          return {
            ...match,
            counter: matchFinishData.counter,
            teamAScore: matchFinishData.teamAScore,
            teamBScore: matchFinishData.teamBScore,
            isOver: matchFinishData.isOver,
          }
        } else {
          return match
        }
      })
    })
  }

  return (
    <div className='result-page'>
      <div className='result-page__matches container  d-flex justify-content-center align-items-center'>
        <div className='d-flex flex-column matches-result w-75'>
          <MatchHubConnection
            matches={matches}
            onMatchUpdated={handleMatchUpdated}
            onMatchFinish={onMatchFinish}
          />
          <ul className='result-list m-0 p-0'>
            {resultMatchesList.map((match) => (
              <Match key={match.id} match={match} />
            ))}
          </ul>
        </div>
        {showConfetti && isOpenModal && <Confetti numberOfPieces={250} />}
        <ResultModal
          open={isOpenModal}
          onClose={handleCloseModal}
          isBetWin={isBetWin}
          potentialWin={potentialWin}
        ></ResultModal>
      </div>
    </div>
  )
}

export default MatchResultPage
