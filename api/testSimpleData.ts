import baseURL from '../api/baseURL'

export async function testSimpleData(params: registerTestListParams) {
  const response = await fetch(`${baseURL}/api/application/test/simpleData`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  return response.json()
}

type registerTestListParams = {
  userId: string
  level: string
  testName: string
  times: number
}
