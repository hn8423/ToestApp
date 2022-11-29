import {atom} from 'recoil'

export type TestSimpleData = {
  id: string
  userId?: string
  testLevelId: string
  countryCode: string
  lang: string
  done: boolean
  doneTimeStamp?: string
  updateAt: string
}

type TestSimpleDataState = TestSimpleData | null

export const TestSimpleDataState = atom<TestSimpleDataState>({
  key: 'testSimpleDataState',
  default: null,
})
