import React, { useEffect, useState } from 'react'
import { Match } from '../../bet-page/interfaces/Match'
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

interface MatchHubProps {
  matches: Match[]
  onCounterUpdated: (data: any) => void
}

const MatchHubConnection: React.FC<MatchHubProps> = ({ matches, onCounterUpdated }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null)

  useEffect(() => {
    const createConnection = async () => {
      const hubConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:8000/matchHub')
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build()

      try {
        await hubConnection.start()

        hubConnection.on('CounterUpdated', (data: any) => {
          onCounterUpdated(data)
        })

        hubConnection.on('MatchFinished', () => {
          console.log('Match finished')
        })

        setConnection(hubConnection)
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
        const matchRequests = matches.map((match) => ({
          matchId: match.id,
          teamAId: match.teamA.id,
          teamBId: match.teamB.id,
        }));
        connection.invoke('StartMatch', matchRequests)
      }
    } catch (error) {
      console.log('error when starting matches', error)
    }
  }

  return (
    <div>
        <button onClick={startAllMatches}>Rozpocznij wszystkie mecze</button>
    </div>
  )
}
export default MatchHubConnection
