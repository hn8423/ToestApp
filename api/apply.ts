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

export async function freepay(params: PreventParams) {
  const response = await fetch(`${baseURL}/api/application/apply/freepay`, {
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

type PreventParams = {
  testLevelId: string
  userId: string
}
