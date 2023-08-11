import React, { useEffect, useState } from 'react'
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { IMatchLive, Match, MatchRequest } from '../../../models/Match'

interface MatchHubProps {
  matches: Match[]
  onMatchUpdated: (data: IMatchLive) => void
  onMatchFinish: (data: boolean) => void
}

const MatchHubConnection: React.FC<MatchHubProps> = ({
  matches,
  onMatchUpdated: onMatchUpdated,
  onMatchFinish: onMatchFinish,
}) => {
  const [connection, setConnection] = useState<HubConnection | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const createConnection = async () => {
      const hubConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:8000/matchHub')
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build()

      try {
        await hubConnection.start()

        hubConnection.on('CounterUpdated', (data: IMatchLive) => {
          onMatchUpdated(data)
        })

        hubConnection.on('matchesCompleted', (isCouponWin: boolean) => {
          onMatchFinish(isCouponWin)
        })

        setConnection(hubConnection)
        setIsConnected(true)
      } catch (error) {
        console.log('Err:', error)
      }
    }

    createConnection()

    return () => {
      if (connection) {
        connection.stop()
      }
    }
  }, [])

  const startAllMatches = async () => {
    try {
      if (connection) {
        const matchRequests: any[] = matches.map((match) => ({
          matchId: match.id,
          teamAId: match.teamA.id,
          teamBId: match.teamB.id,
          betCourse: match.betTypeCourse!,
          betType: match.betType,
        }))
        connection.invoke('StartMatch', matchRequests)
      }
    } catch (error) {
      console.log('error when starting matches', error)
    }
  }

  useEffect(() => {
    if (isConnected) {
      startAllMatches()
    }
  }, [isConnected])

  return null
}
export default MatchHubConnection
