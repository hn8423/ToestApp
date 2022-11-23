import {atom} from 'recoil'

export type ResultInfo = {
  id: string
  countryCode: string
  done: boolean
  doneTimeStamp: string
  lang: string
  testLevel: {
    descriptionEn: string
    descriptionKo: string
    displayName: string
    id: string
    name: string
    order: number
    priceEn: number
    priceKo: number
    test: any
    testId: string
    time: number
  }
  testLevelId: string
  updateAt: string
  userId: string
}

type ResultInfoState = ResultInfo[] | null

export const ResultInfoState = atom<ResultInfoState>({
  key: 'resultInfoState',
  default: null,
})
