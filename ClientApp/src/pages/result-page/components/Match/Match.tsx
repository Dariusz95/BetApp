import React, { useEffect, useState } from 'react'
import { BetType, IMatchResult, Match } from '../../../bet-page/interfaces/Match'
import './Match.scss'

interface MatchProps {
  match: IMatchResult
}

const MatchResult: React.FC<MatchProps> = ({ match }) => {
  const { counter: matchCounter, teamAScore, teamBScore, isOver } = match
  const { name: teamAName, imageUrl: teamAImageUrl } = match.teamA
  const { name: teamBName, imageUrl: teamBImageUrl } = match.teamB

  const [isBetWin, setIsBetWin] = useState<boolean | null>(null)

  useEffect(() => {
    if (isOver) {
      const goalsAmount = (teamAScore || 0) + (teamBScore || 0)

      switch (match.betType) {
        case BetType.TeamA:
          setIsBetWin(teamAScore && teamBScore ? teamAScore > teamBScore : false)
          break
        case BetType.TeamB:
          setIsBetWin(teamAScore && teamBScore ? teamAScore < teamBScore : false)
          break
        case BetType.Draw:
          setIsBetWin(teamAScore && teamBScore ? teamAScore === teamBScore : false)
          break
        case BetType.Minus2_5:
          setIsBetWin(goalsAmount < 2.5)
          break
        case BetType.Minus3_5:
          setIsBetWin(goalsAmount < 3.5)
          break
        case BetType.Minus4_5:
          setIsBetWin(goalsAmount < 4.5)
          break
        case BetType.Plus2_5:
          setIsBetWin(goalsAmount > 2.5)
          break
        case BetType.Plus3_5:
          setIsBetWin(goalsAmount > 3.5)
          break
        case BetType.Plus4_5:
          setIsBetWin(goalsAmount > 4.5)
          break
        default:
          setIsBetWin(false)
      }
    }
  }, [isOver, teamAScore, teamBScore, match.betType])

  // useEffect(() => {
  //   if (match.counter === 90) {
  //     const isTeamAWon =
  //       match.teamAScore && match.teamBScore ? match.teamAScore > match.teamBScore : false
  //     const isTeamBWon =
  //       match.teamAScore && match.teamBScore ? match.teamAScore < match.teamBScore : false
  //     const isDraw =
  //       match.teamAScore && match.teamBScore ? match.teamAScore === match.teamBScore : false
  //     const goalsAmount = match.teamAScore! + match.teamBScore!

  //     switch (match.betType) {
  //       case BetType.TeamA:
  //         match.isBetWin = isTeamAWon
  //         break
  //       case BetType.TeamB:
  //         match.isBetWin = isTeamBWon
  //         break
  //       case BetType.Draw:
  //         match.isBetWin = isDraw
  //         break
  //       case BetType.Minus2_5:
  //         match.isBetWin = goalsAmount < 2.5
  //         break
  //       case BetType.Minus3_5:
  //         match.isBetWin = goalsAmount < 3.5
  //         break
  //       case BetType.Minus4_5:
  //         match.isBetWin = goalsAmount < 4.5
  //         break
  //       case BetType.Plus2_5:
  //         match.isBetWin = goalsAmount > 2.5
  //         console.log(match.isBetWin)
  //         break
  //       case BetType.Plus3_5:
  //         match.isBetWin = goalsAmount > 3.5
  //         break
  //       case BetType.Plus4_5:
  //         match.isBetWin = goalsAmount > 4.5
  //         break
  //       default:
  //         match.isBetWin = false
  //     }
  //     console.log(match)
  //   }
  // }, [match.isOver])

  return (
    // <li className='single-match-result d-flex py-2'>
    <li
      className={`single-match-result d-flex py-2 ${
        isOver ? (isBetWin ? 'is-win' : 'is-loss') : ''
      }`}
    >
      <span className='single-match-result__time w-15 px-1'>{matchCounter}</span>
      <span className='single-match-result__status pe-2 w-15'>live</span>
      <div className='single-match-result__match d-flex'>
        <div className='single-match-result__team d-flex'>
          <p className='single-match-result__match--name  font-weight-bold m-0 px-2'>{teamAName}</p>
          <img
            src={teamAImageUrl}
            className='single-match-result__match--thumbnail'
            style={{ maxWidth: '25px', maxHeight: '25px' }}
          />
        </div>
        <p className='single-match-result__match--score m-0 px-2'>
          {matchCounter && matchCounter > 0 ? (
            <>
              <span>{teamAScore}</span>
              <span> - </span>
              <span>{teamBScore}</span>
            </>
          ) : (
            <span>VS</span>
          )}
        </p>
        <div className='single-match-result__team d-flex'>
          <img
            src={teamBImageUrl}
            className='single-match-result__match--thumbnail'
            style={{ maxWidth: '25px', maxHeight: '25px' }}
          />
          <p className='single-match-result__match--name  font-weight-bold m-0 px-2'>{teamBName}</p>
        </div>
      </div>
    </li>
  )
}

export default MatchResult
