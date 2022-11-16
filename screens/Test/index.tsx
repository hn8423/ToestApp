import React, {useEffect, useRef, useMemo} from 'react'
import {View, Text, Dimensions, Image, ScrollView} from 'react-native'
import {NavigationProps, LangMap2, ToestRef} from '../../type'
import {useRecoilValue} from 'recoil'
import {langState} from '../../atoms/lang'
import useGetStyle from '../../hooks/use-style'
import Header from '../../component/Header'
import Card from '../../component/Card'
import {DrawerActions} from '@react-navigation/native'
import {RegisterTestInfoState} from '../../atoms/registertesInfo'
import {AuthState} from '../../atoms/auth'
import useRegisterTestList from '../../hooks/useRegistertestList'
import Toast from '../../component/Toest'
const chartWidth = Dimensions.get('window').width
const globalText: LangMap2 = {
  unlock: {
    en: 'Unlock',
    ko: '미래 역량과 적성을',
  },
  learner: {
    en: `learner's potential`,
    ko: '진단해보세요!',
  },
  description1: {
    en: 'Authentic assessment combines',
    ko: '일상생활에서 온라인으로 진행되는 TOEST의 테스트는',
  },
  description2: {
    en: 'mentoring, and learning to promote',
    ko: '미래 역량과 적성을 진단하고 분석하는 평가도구일 뿐 아니라, ',
  },
  description3: {
    en: 'higher-ordered thinking, and full',
    ko: '고차원적인 사고를 촉진시키는 학습 활동입니다. ',
  },
  description4: {
    en: 'participation of learners through daily',
    ko: '',
  },
  description5: {
    en: 'routines. ',
    ko: '',
  },
  test1: {
    en: 'YOUR',
    ko: '시험',
  },
  test2: {
    en: 'TEST',
    ko: '응시',
  },
}
type QueryKeyTestList = {
  id: string
  name: string
  times: number
  startApplicationPeriod: Date
  endApplicationPeriod: Date
  descriptionKo: string
  descriptionEn: string
  startContestDate: Date
  endContestDate: Date
  resultOpenDate: number
  announcementKo: string
  announcementEn: string
  areasOfEvaluationKo: string
  areasOfEvaluationEn: string
  discount: boolean
  discountPercentage: number
  shortDescription: string
  thumbnail: string
  thumbnailLong: string
}
const Test = ({navigation}: NavigationProps) => {
  //data
  //data
  //data

  const toastRef = useRef<ToestRef>()
  const user = useRecoilValue(AuthState)
  const lang = useRecoilValue(langState) as 'en' | 'ko'

  const RegistedTestList = useRecoilValue(RegisterTestInfoState)

  const {mutate: registedTestListMutate, isLoading} = useRegisterTestList()
  useEffect(() => {
    if (user) {
    } else {
      toastRef.current?.show(globalText.requireLogin[lang])
      setTimeout(() => {
        navigation.dispatch(DrawerActions.jumpTo('LoginStackNavigator'))
      }, 3000)
    }
  }, [lang, navigation, user])
  useEffect(() => {
    if (user) {
      registedTestListMutate({userId: user[0].id})
    }
  }, [registedTestListMutate, user])

  const testListLang = useMemo(() => {
    if (!RegistedTestList) {
      return
    }

    return RegistedTestList.map(v => {
      return {
        title: `${v.testLevel.test.name} - ${v.testLevel.name}`,
        description:
          lang === 'en' ? v.testLevel.descriptionEn : v.testLevel.descriptionKo,
        thumbnail: v.testLevel.test.thumbnail,
        times: v.testLevel.test.times,
        level: v.testLevel.name,
        link: `/mobile/test/detail/${v.testLevel.test.name}/${v.testLevel.test.times}/${v.testLevel.name}`,
      }
    })
  }, [RegistedTestList, lang])

  // renderMap
  // renderMap
  // renderMap

  const cardList = useMemo(() => {
    if (!testListLang) {
      return
    }

    return testListLang.map((v, i) => {
      // console.log(v)
      return (
        <Card
          key={i}
          title={v.title}
          description={v.description}
          navigation={navigation}
          times={v.times}
          level={v.level}
          routeName="TestDetail"
        ></Card>
      )
    })
  }, [navigation, testListLang])
  //style
  //style
  //style
  const style = useGetStyle({
    center: {
      alignItems: 'center',
    },
    imgWrapper: {},
    mainImg: {
      width: chartWidth,
      resizeMode: 'cover',
    },
    bottomWrapper: {
      width: chartWidth,
      paddingVertical: 32,
      paddingHorizontal: 16,
    },
    textArea: {
      flexDirection: 'row',
    },
    text1: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
      color: '#4AC1E8',
    },
    text2: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
      color: '#191919',
    },
    cardWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 16,
    },
    textWrapper: {
      position: 'absolute',
      zIndex: 3,
      top: 96,
      left: 16,
    },
    titleWrapper: {
      flexDirection: 'row',
    },
    title: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 28,
      lineHeight: 32,
      letterSpacing: 0.18,
      color: '#fff',
    },

    titleColor: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 28,
      lineHeight: 32,
      letterSpacing: 0.18,
      color: '#4AC1E8',
    },
    sub: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: '#fff',
    },
    brithtness: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 2,
    },
  })
  return (
    <>
      <Header />
      <ScrollView>
        <View {...style.center}>
          <View>
            <View {...style.textWrapper}>
              <View {...style.titleWrapper}>
                <Text {...style.titleColor}>Unlock</Text>
                {/* <Text {...style.title}>iscover,</Text> */}
              </View>
              <View {...style.titleWrapper}>
                {/* <Text {...style.titleColor}>E</Text> */}
                <Text {...style.title}>learner's potential</Text>
              </View>
              <View>
                <Text {...style.sub}>{globalText.description1[lang]}</Text>
                <Text {...style.sub}>{globalText.description2[lang]}</Text>
                <Text {...style.sub}>{globalText.description3[lang]}</Text>
                <Text {...style.sub}>{globalText.description4[lang]}</Text>
              </View>
            </View>
            <View {...style.brithtness}></View>
            <Image
              {...style.mainImg}
              source={require('../../assets/images/test/main.png')}
            />
          </View>
          <View {...style.bottomWrapper}>
            <View {...style.textArea}>
              <Text {...style.text1}>{globalText.test1[lang]} </Text>
              <Text {...style.text2}>{globalText.test2[lang]}</Text>
            </View>
            <View {...style.cardWrapper}>{cardList}</View>
          </View>
        </View>
        <Toast />
      </ScrollView>
    </>
  )
}

export default Test
