import React, {useEffect, useMemo, useState} from 'react'
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  Platform,
  Alert,
  ToastAndroid,
} from 'react-native'
import {LangMap1, SC, ResultStackParams} from '../../type'
import {useRecoilState, useRecoilValue} from 'recoil'
import {langState} from '../../atoms/lang'
import useGetStyle from '../../hooks/use-style'
import Header from '../../component/Header'
import Card from '../../component/Card'
import {DrawerActions, useIsFocused} from '@react-navigation/native'
import {AuthState} from '../../atoms/auth'
import Toast from '../../component/Toest'
import useResultInfo from '../../hooks/useResultInfo'
import {ResultInfoState} from '../../atoms/resultInfo'
const chartWidth = Dimensions.get('window').width

const Result: SC<ResultStackParams, 'ResultStack'> = ({navigation}) => {
  //data
  //data
  //data
  const [globalText] = useState<LangMap1>({
    ko: {
      imgTitle1: `TOEST AI 진단 리포트 `,
      bannerDes: `
      각 평가별로 AI가 진단한 상세리포트와 누적리포트를 제공합니다.`,
      test1: `시험`,
      test2: `결과`,
      notLogined: `로그인이 필요한 서비스 입니다.
    로그인 페이지로 이동합니다.`,
    },
    en: {
      imgTitle1: `TOEST Portfolio`,

      bannerDes:
        ' Authentic assessment combines\nmentoring, and learning to promote\nhigher-ordered thinking, and full\nparticipation of learners through daily\nroutines.',
      test1: `NEW`,
      test2: `RESULT`,
      notLogined: `It's a service that requires signin.
    Go to the login page.`,
    },
  })

  const user = useRecoilValue(AuthState)
  const lang = useRecoilValue(langState) as 'en' | 'ko'
  const isFocused = useIsFocused()

  const [testData] = useRecoilState(ResultInfoState)
  const {mutate: resultInfoListMutate, isLoading} = useResultInfo()
  useEffect(() => {
    if (!isFocused) {
      return
    }
    if (user) {
      resultInfoListMutate({userId: user[0].id})
    } else {
      if (Platform.OS === 'ios') {
        Alert.alert('message', globalText[lang].notLogined)
      } else {
        ToastAndroid.show(globalText[lang].notLogined, ToastAndroid.SHORT)
      }
      navigation.dispatch(DrawerActions.jumpTo('LoginStackNavigator'))
    }
  }, [lang, navigation, resultInfoListMutate, user, isFocused, globalText])

  const isEng = useMemo(() => lang === 'en', [lang])
  const testDataLang = useMemo(() => {
    if (!testData) {
      return
    }

    return testData.map(v => {
      return {
        title: `${v.testLevel.test.name} - ${v.testLevel.name}`,
        description: isEng
          ? v.testLevel.descriptionEn
          : v.testLevel.descriptionKo,
        times: v.testLevel.test.times,
        level: v.testLevel.name,
        thumbnail: v.testLevel.test.thumbnail,
        link: `/result/${v.testLevel.test.name}/${v.testLevel.test.times}/${v.testLevel.name}`,
      }
    })
  }, [isEng, testData])

  // renderMap
  // renderMap
  // renderMap

  const cardList = useMemo(() => {
    if (!testDataLang) {
      return
    }

    return testDataLang.map((v, i) => {
      return (
        <Card
          key={i}
          title={v.title}
          description={v.description}
          navigation={navigation}
          times={v.times}
          level={v.level}
          routeName="ResultDetail"
        />
      )
    })
  }, [navigation, testDataLang])
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
      fontWeight: '700',
      fontSize: 16,
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
                <Text {...style.titleColor}>{globalText[lang].imgTitle1}</Text>
              </View>

              <View>
                <Text {...style.sub}>{globalText[lang].bannerDes}</Text>
              </View>
            </View>
            <View {...style.brithtness} />
            <Image
              {...style.mainImg}
              source={require('../../assets/images/result/main.png')}
            />
          </View>
          <View {...style.bottomWrapper}>
            <View {...style.textArea}>
              <Text {...style.text1}>{globalText[lang].test1} </Text>
              <Text {...style.text2}>{globalText[lang].test2}</Text>
            </View>
            <View {...style.cardWrapper}>{cardList}</View>
          </View>
        </View>
        <Toast />
      </ScrollView>
    </>
  )
}

export default Result
