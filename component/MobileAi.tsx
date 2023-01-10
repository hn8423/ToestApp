import {useMemo, useState} from 'react'
import {Image, ScrollView, Text, View} from 'react-native'
import {LangMap2, ResultParamList, SC} from '../type'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
import useStyles2 from '../hooks/ use-style2'
import ImageSliderMovie from './ImageSliderMovie'
import _ from 'lodash'
import ImageSliderChannel from './ImageSliderChannel'
import ImageSliderPeople from './ImageSliderPeople'
import {ResultDetailInfoState} from '../atoms/resultDetailInfo'
import useAIRecommend from '../hooks/useAIRecommend'

type paramsType = {
  testName: string
  times: number
  level: string
}
const MobileAi: SC<ResultParamList, 'MobileAi'> = ({route}) => {
  //data
  //data
  //data
  const params = route.params as paramsType
  const resultDetailData = useRecoilValue(ResultDetailInfoState)
  const resultInfo = resultDetailData?.resultInfo
  const dataList = useMemo(() => {
    let result = [
      {
        name: 'dom_artHuman',
        score: resultDetailData?.resultInfo?.scoreMap.dom_artHumanScore,
      },
      {
        name: 'dom_healthGlobal',
        score: resultDetailData?.resultInfo?.scoreMap.dom_healthGlobalScore,
      },
      {
        name: 'dom_socialScience',
        score: resultDetailData?.resultInfo?.scoreMap.dom_socialScienceScore,
      },
      {
        name: 'dom_technology',
        score: resultDetailData?.resultInfo?.scoreMap.dom_technologyScore,
      },
    ]
    return result
  }, [resultDetailData])
  const dataListOrderByAchievement = useMemo(() => {
    return _(dataList)
      .orderBy(v => {
        if (v.score) v.score.achievement
      }, 'desc')
      .value()
  }, [dataList])
  const top2Data = useMemo(
    () => dataListOrderByAchievement.slice(0, 2),
    [dataListOrderByAchievement],
  )
  const top2DataForNotZero = useMemo(
    () =>
      _(top2Data)
        .filter(data => {
          if (!data.score || 0) {
            return false
          }
          return true
          // data.score.score
        })
        .value(),
    [top2Data],
  )
  const dataListFor80Over = useMemo(
    () =>
      _(dataListOrderByAchievement)
        .filter(v => {
          if (!v.score) {
            return false
          }
          return v.score.achievement >= 80
        })
        .value(),
    [dataListOrderByAchievement],
  )
  const displayDataList = useMemo(() => {
    let is80OverDisplay = dataListFor80Over.length > 2
    return is80OverDisplay ? dataListFor80Over : top2DataForNotZero
  }, [dataListFor80Over, top2DataForNotZero])

  const obtainBadgeStrong = useMemo(() => {
    return displayDataList.map(v => v.name)
  }, [displayDataList])
  const aiRecommendation = useAIRecommend({
    data: resultDetailData?.resultAIRecommendation,
    badgeList: obtainBadgeStrong,
    userId: resultDetailData?.resultUserId,
    testName: params.testName,
    times: params.times,
    level: params.level,
  })

  const {styles} = useStyles2({
    wrapper: {flex: 1},
    robotWrapper: {
      marginTop: 30,
      width: '100%',
      alignItems: 'center',
    },
    aiSlide: {
      width: '100%',
      height: 500,
      alignItems: 'center',
      marginTop: 60,
    },
    titleFont: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
    },
    blackColor: {
      color: '#191919',
    },
  })

  const [globalText] = useState<LangMap2>({
    ko: {
      imgTitle1: `AI`,
      imgTitle2: `추천`,
      bannerDes: `
      미래역량과 적성을 분석한 포트폴리오에 기반하여 Ai가 개인화 맞춤 추천 학습 컨텐츠를 제공합니다.`,
      notScore:
        'AI 추천을 위한 최소 요구 기준 점수에 도달하지 못하였습니다.\n다음 시험에 다시 도전해보세요.',
      movieTitle: '영화 추천',
      channelsTitle: '채널 추천',
      peopleInterestTitle: '관심사와 일치하는 사람들',
    },
    en: {
      imgTitle1: `Ai's`,
      imgTitle2: `Recommendations`,

      bannerDes: `
      AI curated relevant learning content based on individual competence and aptitude. 
Get a visualized report of every student in one Comprehensive System.`,
      notScore:
        "You have not achieved the minimum requirement to assess your Ai's Recommendations.\nPlease try again for the next test.",
      movieTitle: 'Recommended Movies',
      channelsTitle: 'Recommended Channels',
      peopleInterestTitle: 'People that match your interests',
    },
  })

  /**@type {'en'|'ko'} */
  const lang = useRecoilValue(langState) as 'en' | 'ko'

  //rendermap
  //rendermap
  //rendermap

  const peopleMap = useMemo(() => {
    if (!aiRecommendation) {
      return
    }
    return aiRecommendation.people.map((v, i) => {
      let image
      switch (v.dom) {
        case 'dom_artHuman':
          image = '/images/result/ai/peopleArt.png'
          break
        case 'dom_healthGlobal':
          image = '/images/result/ai/peopleHealth.png'
          break
        case 'dom_socialScience':
          image = '/images/result/ai/peoplesocial.png'
          break
        case 'dom_technology':
          image = '/images/result/ai/peopleScience.png'
          break
      }
      return {
        image: image,
        key: `slider-people-${v.id}`,
        order: i,
        name: v.name,
        occupation: v.occupation,
        tags: v.tags,
      }
    })
  }, [aiRecommendation])
  const movieMap = useMemo(() => {
    if (!aiRecommendation) {
      return
    }
    return aiRecommendation?.movie.map((v, i) => {
      let dom = ''
      switch (v.dom) {
        case 'dom_artHuman':
          dom = 'Art & Humanities'
          break
        case 'dom_healthGlobal':
          dom = 'Health and Global Environment'
          break
        case 'dom_socialScience':
          dom = 'Social Science'
          break
        case 'dom_technology':
          dom = 'Physical science, Technology and Engineering'
          break
      }
      return {
        location: v.thumbnail,
        key: `slider-movie-${v.id}`,
        order: i,
        title: v.title,
        dom: dom,
        tags: v.tags,
        url: v.url,
        genre: v.genre,
      }
    })
  }, [aiRecommendation])

  const channelMap = useMemo(() => {
    if (!aiRecommendation) {
      return
    }
    return aiRecommendation!.channel.map((v, i) => {
      let dom = ''
      switch (v.dom) {
        case 'dom_artHuman':
          dom = 'Art & Humanities'
          break
        case 'dom_healthGlobal':
          dom = 'Health and Global Environment'
          break
        case 'dom_socialScience':
          dom = 'Social Science'
          break
        case 'dom_technology':
          dom = 'Physical science, Technology and Engineering'
          break
      }
      return {
        location: v.thumbnail,
        key: `slider-channel-${v.id}`,
        order: i,
        name: v.title,
        dom: dom,
        tags: v.tags,
        url: v.url,
      }
    })
  }, [aiRecommendation])
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.wrapper]}>
        <View style={[styles.robotWrapper]}>
          <Image source={require('../assets/images/result/ai/robotAi.png')} />
        </View>
        <View style={[styles.aiSlide]}>
          <Text style={[styles.titleFont, styles.blackColor]}>
            {globalText[lang].movieTitle}
          </Text>
          <ImageSliderMovie images={movieMap} />
        </View>
        <View style={[styles.aiSlide]}>
          <Text style={[styles.titleFont, styles.blackColor]}>
            {globalText[lang].channelsTitle}
          </Text>
          <ImageSliderChannel images={channelMap} />
        </View>
        <View style={[styles.aiSlide]}>
          <Text style={[styles.titleFont, styles.blackColor]}>
            {globalText[lang].peopleInterestTitle}
          </Text>
          <ImageSliderPeople images={peopleMap} />
        </View>
      </View>
    </ScrollView>
  )
}

export default MobileAi
