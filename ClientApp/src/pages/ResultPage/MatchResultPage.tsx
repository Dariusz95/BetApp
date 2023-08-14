import React, { useEffect, useRef, useState } from 'react'
import MatchHubConnection from './components/MatchHubConnection'
import { MatchResultProps } from './interfaces/MatchResultProps'
import './MatchResultPage.scss'
import Match from './components/Match/Match'
import { useLocation } from 'react-router-dom'
import ResultModal from './components/ResultModal/ResultModal'
import Confetti from 'react-confetti'
import { IMatchResult, IMatchLive } from '../../models/Match'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { setIfRefreshCurrentUserDetails } from '../../store/authSlice'

const MatchResultPage: React.FC<MatchResultProps> = ({ matches }) => {
  const [resultMatchesList, setResultMatchesList] = useState<IMatchResult[]>(matches)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isBetWin, setIsBetWin] = useState(false)
  const [potentialWin, setPotentialWin] = useState(0)
  const [betValue, setBetValue] = useState(0)
  const location = useLocation()
  const [showConfetti, setShowConfetti] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const { potentialWin, betValue } = location.state
    console.log(betValue)
    setPotentialWin(potentialWin)
    setBetValue(betValue)
  }, [location.state.potentialWin, location.state.betValue])

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleMatchUpdated = (updatedData: IMatchLive) => {
    setResultMatchesList((prevMatches) => {
      return prevMatches.map((match) => {
        if (match.id === updatedData.id) {
          return {
            ...match,
            counter: updatedData.counter,
            teamAScore: updatedData.teamAScore,
            teamBScore: updatedData.teamBScore,
            isOver: updatedData.isOver,
            isWin: updatedData.isWin,
          }
        } else {
          return match
        }
      })
    })
  }

  const onMatchFinish = (isCouponWin: boolean) => {
    setIsOpenModal(true)
    setIsBetWin(isCouponWin)
    setShowConfetti(isCouponWin)
    dispatch(setIfRefreshCurrentUserDetails(true))
  }

  return (
    <div className='result-page'>
      <div className='result-page__matches container  d-flex justify-content-center align-items-center'>
        <div className='d-flex flex-column matches-result w-75'>
          <MatchHubConnection
            betValue={betValue}
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
