import {atom} from 'recoil'
import {Result} from '../type/result'

export type ResultDetailInfo = {
  resultInfo: {}
}

type ResultDetailInfoState = Result.DetailDataType | null

export const ResultDetailInfoState = atom<ResultDetailInfoState>({
  key: 'resultDetailInfoState',
  default: null,
})
