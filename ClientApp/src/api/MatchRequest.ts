import { IMatchResult, Match } from '../models/Match'
import { requests } from './Api'

export const MatchRequest = {
  AddCoupon: (matchData: IMatchResult[]): Promise<any> => requests.post('addCoupon', matchData),
}
