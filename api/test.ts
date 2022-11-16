import baseURL from '../api/baseURL'

export async function registerTestList(params: registerTestListParams) {
  const response = await fetch(`${baseURL}/api/application/test/main`, {
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
}
