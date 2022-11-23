import baseURL from './baseURL'

export async function resultData(params: resultDataParams) {
  const response = await fetch(`${baseURL}/api/application/result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  return response.json()
}

type resultDataParams = {
  userId: string
}
