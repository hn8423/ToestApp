import {useMemo, useState} from 'react'
import {Image, Text, View} from 'react-native'
import {Result} from '../type/result'
import {LangMap2} from '../type'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
import useStyles2 from '../hooks/ use-style2'
import ImageSliderMovie from './ImageSliderMovie'
import _ from 'lodash'
import {AiRecommend} from '../atoms/aiRecomend'
import ImageSliderChannel from './ImageSliderChannel'
import ImageSliderPeople from './ImageSliderPeople'

type Props = {
  data: {
    resultInfo?: Result.DetailDataType['resultInfo']
    aiRecommendation?: AiRecommend
  }
}
const MobileAi = ({data: {resultInfo, aiRecommendation}}: Props) => {
  //data
  //data
  //data
  const {getStyles, styles} = useStyles2({
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
  const textLang = useMemo(() => globalText[lang], [globalText, lang])

  const isScoreZero = useMemo(() => {
    return resultInfo ? resultInfo.scoreMap.score.score === 0 : true
  }, [resultInfo])

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
        key: `slider-${v.id}`,
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
    return aiRecommendation.movie.map((v, i) => {
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
        key: `slider-${v.id}`,
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
    return aiRecommendation.channel.map((v, i) => {
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
        key: `slider-${v.id}`,
        order: i,
        name: v.title,
        dom: dom,
        tags: v.tags,
        url: v.url,
      }
    })
  }, [aiRecommendation])

  return (
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
  )
}

export default MobileAi
