import baseURL from '../api/baseURL'

export async function getticket(params: GetTicketParams) {
  const response = await fetch(`${baseURL}/api/application/mypage/getticket`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  return response.json()
}

export async function updateAccount(params: updateAccountParams) {
  const response = await fetch(
    `${baseURL}/api/application/mypage/accountsetting`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  )
  return response.json()
}

type updateAccountParams = {
  name: string
  chPW?: string
  code: string
  userId: string
  email: string
}

type GetTicketParams = {
  userId: string
}
