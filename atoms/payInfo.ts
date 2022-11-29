import {atom} from 'recoil'

export type PayInfo = [
  {
    id: string
    userId: string
    resultId: string
    testLevelId: string
    date: string
    payType: string
    PayMethod: string
    GoodsName: string
    Amt: string
    BuyerTel: string
  },
]

type PayInfoState = PayInfo | null

export const PayInfoState = atom<PayInfoState>({
  key: 'payInfoState',
  default: null,
})
