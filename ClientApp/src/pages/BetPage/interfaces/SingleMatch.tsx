import { Match } from '../../../models/Match'

export interface SingleMatch {
  handleAccordionClick: (id: string) => void
  isExpanded: boolean
  match: Match
  addToSelectedMatches: (match: Match) => void
  selectedMatch: Match | undefined
}

export interface SelectedMatchesModalProps {
  selectedMatches: Match[]
  totalBetTypeCourse: number
}
