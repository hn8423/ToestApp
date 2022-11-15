import baseURL from '../api/baseURL'

export async function testList() {
  const response = await fetch(`${baseURL}/api/application/apply`)
  return response.json()
}

export async function detail(params: DetailParams) {
  const response = await fetch(`${baseURL}/api/application/apply/detail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  return response.json()
}

export async function pay(params: PayParams) {
  const response = await fetch(`${baseURL}/api/application/apply/pay`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  return response.json()
}

type DetailParams = {
  testName: string
  times: number
}

type PayParams = {
  testLevelId: string
  userId: string
  payType: string
  PayMethod: string
  GoodsName: string
  Amt: string
  BuyerTel: string
}
