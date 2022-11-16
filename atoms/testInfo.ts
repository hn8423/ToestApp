import {atom} from 'recoil'

export type TestInfo = {
  id: string
  name: string
  times: number
  startApplicationPeriod: Date
  endApplicationPeriod: Date
  descriptionKo: string
  descriptionEn: string
  startContestDate: string
  endContestDate: string
  resultOpenDate: number
  announcementKo: string
  announcementEn: string
  areasOfEvaluationKo: string
  areasOfEvaluationEn: string
  discount: boolean
  discountPercentage: number
  shortDescription: string
  thumbnail: string
  thumbnailLong: string
  levels: any
}

type TestInfoState = TestInfo | null

export const TestInfoState = atom<TestInfoState>({
  key: 'testInfoState',
  default: null,
})
