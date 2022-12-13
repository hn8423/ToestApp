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
export async function fixAiRecommendation(params: fixAiRecommendation) {
  const response = await fetch(`${baseURL}/api/application/result/fixai`, {
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

type fixAiRecommendation = {
  AIChannelList: any[]
  AIMovieList: any[]
  AIPeopleList: any[]
  testName: string
  level: string
  times: number
  userId: string | undefined
}
