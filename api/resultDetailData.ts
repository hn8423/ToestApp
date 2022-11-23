import baseURL from './baseURL'

export async function resultDetailData(params: resultDetailDataParams) {
  const response = await fetch(`${baseURL}/api/application/result/detail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  return response.json()
}

type resultDetailDataParams = {
  level: string
  testName: string
  times: number
}
