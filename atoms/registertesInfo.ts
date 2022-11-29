import {atom} from 'recoil'

export type RegisterTestInfo = [
  {
    id: string
    userId: string
    testLevelId: string
    type: string
    timeStamp: string
    testLevel: any
  },
]

type RegisterTestInfoState = RegisterTestInfo | null

export const RegisterTestInfoState = atom<RegisterTestInfoState>({
  key: 'registerTestInfoState',
  default: null,
})
