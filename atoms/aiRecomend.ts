import {atom} from 'recoil'
import {Result} from '../type/result'

export type AiRecommend = {
  channel: Result.DetailDataType['resultAIRecommendation']['AIChannelList'] & {
    thumbnail: string
  }
  movie: Result.DetailDataType['resultAIRecommendation']['AIMovieList'] & {
    thumbnail: string
    title: string
  }
  people: Result.DetailDataType['resultAIRecommendation']['AIPeopleList']
}

export type AiStateParams = AiRecommend | null

export const AiState = atom<AiStateParams>({
  key: 'aiState',
  default: null,
})
