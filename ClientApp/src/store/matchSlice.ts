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
          state.selectedMatches[matchIndex].betTypeCourse = updatedMatch.betTypeCourse
        }
      } else {
        const newMatch: Match = updatedMatch
        state.selectedMatches.push(newMatch)
      }
    },
  },
})

export const { setMatches, updateSelectedMatch } = matchSlice.actions

export default matchSlice.reducer
