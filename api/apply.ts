import baseURL from '../api/baseURL'

export async function testList() {
  const response = await fetch(`${baseURL}/api/application/apply`)
  return response.json()
}
