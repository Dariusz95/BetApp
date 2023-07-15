import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Match } from '../pages/bet-page/interfaces/Match'

interface MatchState {
  selectedMatches: Match[]
}

const initialState: MatchState = {
  selectedMatches: [],
}

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<Match[]>) => {
      state.selectedMatches = action.payload
    },
    updateSelectedMatch: (state, action: PayloadAction<{ match: Match }>) => {
      const { match: updatedMatch } = action.payload
      const matchIndex = state.selectedMatches.findIndex(
        (selectedMatch) => selectedMatch.id === updatedMatch.id,
      )
      if (matchIndex !== -1) {
        if (updatedMatch.betType === state.selectedMatches[matchIndex].betType) {
          state.selectedMatches.splice(matchIndex, 1)
        } else {
          state.selectedMatches[matchIndex].betType = updatedMatch.betType
        }
      } else {
        const newMatch: Match = updatedMatch
        state.selectedMatches.push(newMatch)
      }
    },
  },
})

// const matchSlice = createSlice({
//   name: 'match',
//   initialState,
//   reducers: {
//     setMatches: (state, action: PayloadAction<Match[]>) => {
//       state.selectedMatches = action.payload
//     },
//     updateSelectedMatch: (
//       state,
//       action: PayloadAction<{ matchId: string; selectedType: '1' | 'X' | '2' | null }>,
//     ) => {
//       console.log(action.payload.matchId, action.payload.selectedType)
//       const { matchId, selectedType } = action.payload
//       const matchIndex = state.selectedMatches.findIndex((match) => match.id === matchId)
//       console.log('matchIndex', matchIndex)
//       if (matchIndex !== -1) {
//         const existingMatch = state.selectedMatches[matchIndex]
//         console.log('existingMatch', existingMatch)
//         if (existingMatch.selected === selectedType) {
//           existingMatch.selected = null
//           state.selectedMatches = state.selectedMatches.filter((match) => match.id !== matchId)
//         } else {
//           existingMatch.selected = selectedType
//           state.selectedMatches.push(existingMatch)
//         }
//       }
//     },
//   },
// })

export const { setMatches, updateSelectedMatch } = matchSlice.actions

export default matchSlice.reducer
