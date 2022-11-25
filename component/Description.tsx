import React, {useEffect, useMemo, useState} from 'react'
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native'
import {TestStackParams, SC, LangMap2} from '../type'
import useGetStyle from '../hooks/use-style'
import Header from '../component/Header'
import ImageSmallSlider from '../component/ImageSmallSlider'
import {TestInfoState} from '../atoms/testInfo'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
import Button from './Button'
const chartWidth = Dimensions.get('window').width
type TestLangType = {
  announcement: string | undefined
  areasOfEvaluation: string | undefined
  description: string | undefined
  name: string | undefined
  levels: any
  startContestDate: string | undefined
  endContestDate: string | undefined
}
type paramsType = {
  testName: string
  times: number
  testLang: TestLangType
  setIsApply: React.Dispatch<React.SetStateAction<boolean>>
}

const globalText: LangMap2 = {
  apply: {
    en: 'APPLY',
    ko: '응시 하기',
  },
  notApplicationPeriod: {
    en: `Not application period`,
    ko: `접수기간이 아닙니다.`,
  },
}

const Description = ({
  testName = '',
  times = 0,
  testLang,
  setIsApply,
}: paramsType) => {
  const testInfo = useRecoilValue(TestInfoState)
  const lang = useRecoilValue(langState) as 'ko' | 'en'
  const isEng = useMemo(() => lang === 'en', [lang])
  // memo
  // memo
  // memo

  const resultDate = useMemo(() => {
    if (!(lang && testInfo)) {
      return ''
    }
    let tempDate = dayjs(testInfo.endContestDate)
      .add(testInfo.resultOpenDate, 'd')
      .utc()
    if (lang === 'en') {
      return tempDate.format('YYYY-MM-DD HH:mm z')
    }
    return `${tempDate.utcOffset('+0900').format('YYYY-MM-DD HH:mm')} KST`
  }, [lang, testInfo])

  const startContest = useMemo(() => {
    let startContestDate = dayjs(testLang.startContestDate).utc()
    let en = `${startContestDate.format('YYYY-MM-DD HH:mm z')}`
    let ko = `${startContestDate
      .utcOffset('+0900')
      .format('YYYY-MM-DD HH:mm')} KST`
    return lang === 'ko' ? ko : en
  }, [lang, testLang.startContestDate])

  const endContest = useMemo(() => {
    let endContestDate = dayjs(testLang.endContestDate).utc()
    let en = `${endContestDate.format('YYYY-MM-DD HH:mm z')}`
    let ko = `${endContestDate
      .utcOffset('+0900')
      .format('YYYY-MM-DD HH:mm')} KST`
    return lang === 'ko' ? ko : en
  }, [lang, testLang.endContestDate])

  const images = useMemo(
    () => [
      {
        location: require('../assets/images/test/gpst1.png'),
      },
      {
        location: require('../assets/images/test/gpst2.png'),
      },
      {
        location: require('../assets/images/test/gpst3.png'),
      },
      {
        location: require('../assets/images/test/gpst4.png'),
      },
    ],
    [],
  )

  const imageList = useMemo(() => {
    return images.map((v, i) => {
      return {...v, key: `imageSlider-${i}`}
    })
  }, [images])

  //function
  //function
  //function

  const onPressPass = () => {
    setIsApply(true)
  }
  //style
  //style
  //style
  const style = useGetStyle({
    center: {},
    textBox: {
      margin: 16,
      padding: 24,
      backgroundColor: '#fff',
      borderRadius: 8,
    },
    title: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
      textTransform: 'capitalize',
      color: '#191919',
    },
    describe: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: '#393939',
      marginBottom: 8,
    },
    line: {
      height: 1,
      width: '100%',
      backgroundColor: '#DBDBDB',
      marginVertical: 8,
    },
    buttonWrapper: {
      margin: 16,
    },
  })
  return (
    <>
      <View {...style.center}>
        <ImageSmallSlider images={images} />
        <View {...style.textBox}>
          <Text {...style.title}>{testLang?.name}</Text>
          <View {...style.line}></View>
          <Text {...style.describe}>{testLang?.description}</Text>
          <Text {...style.title}>{isEng ? 'Contest Date' : '응시일'}</Text>
          <Text {...style.describe}>{`${startContest} ~ ${endContest}`}</Text>
          <Text {...style.title}>{isEng ? 'Announcement' : '발표일'}</Text>
          <Text {...style.describe}>{resultDate}</Text>
          <Text {...style.title}>
            {isEng ? 'Areas of Evaluation' : '평가 영역'}
          </Text>
          <Text {...style.describe}>{testLang.areasOfEvaluation}</Text>
        </View>
        <View {...style.buttonWrapper}>
          <Button
            color={'#fff'}
            backgroundColor={'#4AC1E8'}
            width={chartWidth - 32}
            onPress={onPressPass}
          >
            {globalText.apply[lang]}
          </Button>
        </View>
      </View>
      {/* </ScrollView> */}
    </>
  )
}

export default Description
