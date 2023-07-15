import { Match, SelectedMatch } from './Match'

export interface SingleMatch {
  handleAccordionClick: (id: string) => void
  isExpanded: boolean
  match: Match
  addToSelectedMatches: (match: Match, selectedType: '1' | 'X' | '2', course: number) => void
}

export interface SelectedMatchesModalProps {
  selectedMatches: Match[]
}
