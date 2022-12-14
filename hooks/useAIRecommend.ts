import makeAIRecommendationGroup from '../lib/database-result/gpst/client-makeAIRecommendationGroup'
import mapYoutubeData from '../lib/database-result/gpst/client-mapYoutubeData'
import pickAIRecommendation from '../lib/database-result/gpst/client-pickAIRecommendation'
import _ from 'lodash'
import {useEffect, useMemo, useState} from 'react'
import {Result} from '../type/result'
import useFixAi from './useFixAi'
import aiStorage from '../storages/aiStorage'
import {AiRecommend, AiStateParams} from '../atoms/aiRecomend'

type Props = {
  data?: Result.DetailDataType['resultAIRecommendation']
  badgeList: string[]
  userId?: string
  testName: string
  times: number
  level: string
}

export default function useAIRecommend({
  data,
  badgeList,
  userId,
  testName,
  times,
  level,
}: Props) {
  const [isOnce, setOnce] = useState(true)

  const testInfoExist = useMemo(() => {
    let confirmList = [testName, times, level]
    return !confirmList.some(v => typeof v === 'undefined')
  }, [level, testName, times])
  const [isValid, setValid] = useState(false)

  const isFixed = useMemo(() => !!(data && data.isFixed), [data])

  const aiRecommendationGroup = useMemo(() => {
    if (data) return makeAIRecommendationGroup(data)
  }, [data])

  const badgeCheck = useMemo(() => {
    return _(badgeList)
      .map(v => [v, true])
      .fromPairs()
      .value()
  }, [badgeList])

  const pickRecommendationData = useMemo(() => {
    if (data)
      if (isFixed) {
        let {
          AIChannelList: channel,
          AIMovieList: movie,
          AIPeopleList: people,
        } = data
        return {
          channel,
          movie,
          people,
        }
      }

    if (aiRecommendationGroup && badgeCheck)
      return {
        channel: pickAIRecommendation({
          data: aiRecommendationGroup,
          badgeCheck,
          type: 'channel',
        }),
        movie: pickAIRecommendation({
          data: aiRecommendationGroup,
          badgeCheck,
          type: 'movie',
        }),
        people: pickAIRecommendation({
          data: aiRecommendationGroup,
          badgeCheck,
          type: 'people',
        }),
      }
  }, [aiRecommendationGroup, badgeCheck, data, isFixed])
  const {mutate: fixAi, isLoading: fixAiLoading} = useFixAi()

  useEffect(() => {
    if (isFixed) {
      return
    }
    if (!testInfoExist) {
      return
    }
    /**@type {{[x in 'channel'|'movie'|'people']: string[]}} */
    let pickData = _(pickRecommendationData)
      .mapValues(list =>
        _(list)
          .map(v => v.id)
          .value(),
      )
      .value()
    let {
      channel: AIChannelList,
      movie: AIMovieList,
      people: AIPeopleList,
    } = pickData
    const body = {
      AIChannelList,
      AIMovieList,
      AIPeopleList,
      testName,
      level,
      times,
      userId,
    }
    fixAi(body)
  }, [
    fixAi,
    isFixed,
    level,
    pickRecommendationData,
    testInfoExist,
    testName,
    times,
    userId,
  ])

  const [pickDataMovie, setPickDataM] = useState<any[]>([])

  const [pickDataChannel, setPickDataC] = useState<any[]>([])

  // // ?????? ??????
  // // ?????? ??????
  // // ?????? ??????

  const [testInfoData, setTestInfoData] = useState<AiStateParams>()

  useEffect(() => {
    if (!isValid) {
      return
    }
    if (!testInfoExist) {
      return
    }
    aiStorage.get().then(v => {
      setTestInfoData(v)
    })
  }, [isValid, testInfoExist])

  /**
   * @template {'channel'|'movie'} T
   * @param {T} type
   * @param {pickRecommendationData} target
   */
  async function youtubeData(
    target: {
      channel: any[]
      movie: any[]
      people: any[]
    },
    type: 'channel' | 'movie',
  ) {
    return await mapYoutubeData(target[type], type)
  }

  const totalPickData = useMemo(() => {
    if (testInfoExist && !!testInfoData) {
      return testInfoData
    }
    if (pickRecommendationData)
      return {
        channel: pickDataChannel,
        movie: pickDataMovie,
        people: pickRecommendationData?.people,
      } as unknown as AiRecommend
  }, [
    pickDataChannel,
    pickDataMovie,
    pickRecommendationData,
    testInfoData,
    testInfoExist,
  ])

  useEffect(() => {
    setValid(true)
  }, [])

  useEffect(() => {
    if (!isValid) {
      return
    }
    if (testInfoData) {
      return
    }
    if (!isOnce) {
      return
    }
    // aiStorage.clear()
    if (!pickRecommendationData) {
      return
    }

    youtubeData(pickRecommendationData, 'channel').then(youTybeChannelData => {
      setOnce(false)
      setPickDataC(youTybeChannelData)
    })

    youtubeData(pickRecommendationData, 'movie').then(youTybeMovieData => {
      setOnce(false)
      setPickDataM(youTybeMovieData)
    })
  }, [isOnce, isValid, pickRecommendationData, testInfoData])

  // ?????? AI type??? ?????? pick??? ??????
  // channel??? movie??? youtube data??? ????????? ????????????.
  // ??? useEffect??? async ???????????? ????????? ??? ?????????
  // .then??? ?????? callback??? ?????????.

  useEffect(() => {
    if (!isValid) {
      return
    }
    if (!testInfoExist) {
      return
    }
    if (!totalPickData) {
      return
    }
    if (!totalPickData) {
      return
    }
    if (totalPickData.channel.length === 0) {
      return
    }

    // aiStorage.set(totalPickData)
  }, [isValid, testInfoExist, totalPickData])
  // return pickDataChannel
  // aiStorage.clear()
  // console.log(totalPickData)
  return totalPickData // object?????? data??? ?????? state?????? memo ????????????.
}
