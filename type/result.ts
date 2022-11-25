import Result from '../screens/Result'

/**
 * 'Date'객체가 string된 것
 */
export type DateToString = string

type a = {
  [P in 'string' | 'world']: {
    [K in 'hi' | 'hello']: 'hi'
  }
}

type scoreData = {
  [P in 'world' | 'country']: {
    bottomPercentage: number
    topPercentage: number
    type: string
    average: number
  }
}

type scoreMapinnerData = {
  [K in
    | 'com_communicationScore'
    | 'com_creativeScore'
    | 'com_informationScore'
    | 'com_logicalScore'
    | 'dom_artHumanScore'
    | 'dom_healthGlobalScore'
    | 'dom_socialScienceScore'
    | 'dom_technologyScore']: {
    score: number
    maxScore: number
    achievement: number
  } & scoreData
}

export namespace Result {
  export type DetailDataType = ResultDetailDataType
}

export type ResultDetailDataType = {
  resultInfo: {
    myAnswerInfo: {
      stage: number
      isCorrectedByMyAnswer: boolean
      worldCorrectAnswerRate: number
      countryCorrectAnswerRate: number
      questionInfo: {
        description_correct_KR: string
        description_correct_EN: string
        descriptionOrder: number
      }
    }[]
    scoreMap: {
      score: {
        world: {
          bottomPercentage: number
          topPercentage: number
          type: string
          average: number
        }
        country: {
          bottomPercentage: number
          topPercentage: number
          type: string
          average: number
        }
        score: number
        maxScore: number
        achievement: number
      }
    } & scoreMapinnerData
    countryCode: string
    doneTimeStamp: DateToString
    user: {
      name: string
      id: string
    }
  }
  resultComment: unknown
  resultAIRecommendation: {
    id: string
    testInfoId: string
    AIChannelList: {
      id: string
      recommendationId: string
      url: string
      tags: string
      dom: string
      ytId: string
    }[]
    AIMovieList: {
      id: string
      recommendationId: string
      title: string
      url: string
      tags: string
      dom: string
      genre: string
      movieRatingOfAge: number
      ytId: string
    }[]
    AIPeopleList: {
      id: string
      recommendationId: string
      name: string
      tags: string
      dom: string
      com: string
      occupation: string
    }[]
  }
}
