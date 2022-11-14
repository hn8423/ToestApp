import baseURL from '../api/baseURL'

export async function freepayment(params: Freepayment) {
  const response = await fetch(`${baseURL}/api/application/mypage/getfreepay`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  return response.json()
}

type Freepayment = {
  userId: string
}
