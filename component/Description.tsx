import React, {useEffect, useMemo, useState} from 'react'
import {View, Button, Text, StyleSheet, ScrollView} from 'react-native'
import {TestStackParams, SC} from '../type'
import useGetStyle from '../hooks/use-style'
import Header from '../component/Header'
import ImageSmallSlider from '../component/ImageSmallSlider'
import useTestInfo from '../hooks/useTestInfo'
import {TestInfoState} from '../atoms/testInfo'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
type paramsType = {
  testName: string
  times: number
}

const Description: SC<TestStackParams, 'TestDetail'> = ({
  navigation,
  route,
}) => {
  const params = route.params as paramsType
  const [testName, setTestName] = useState('')
  const [times, setTimes] = useState(0)
  const {mutate, isLoading} = useTestInfo()
  const testInfo = useRecoilValue(TestInfoState)
  const lang = useRecoilValue(langState) as 'ko' | 'en'
  useEffect(() => {
    if (params !== undefined) {
      setTestName(params.testName.split(' ')[0])
      setTimes(params.times)
      mutate({testName, times})
    }
  }, [mutate, params, testName, times])
  const isEng = useMemo(() => lang === 'en', [lang])
  const testLang = useMemo(() => {
    if (!testInfo) {
      return
    }
    switch (lang) {
      case 'en': {
        return {
          announcement: testInfo?.announcementEn,
          areasOfEvaluation: testInfo?.areasOfEvaluationEn,
          description: testInfo?.descriptionEn,
          name: testInfo?.name,
          levels: testInfo?.levels,
        }
      }
      case 'ko': {
        return {
          announcement: testInfo?.announcementKo,
          areasOfEvaluation: testInfo?.areasOfEvaluationKo,
          description: testInfo?.descriptionKo,
          name: testInfo?.name,
          levels: testInfo?.levels,
        }
      }
    }
  }, [lang, testInfo])

  const resultDate = useMemo(() => {
    if (!(lang && testInfo)) {
      return ''
    }
    let start = new Date()
    // let tempDate = moment(testInfo.endContestDate).add(testInfo.resultOpenDate, 'd').utc()
    if (lang === 'en') {
      return testInfo.endContestDate
    }
    return testInfo.endContestDate
  }, [lang, testInfo])

  const images = useMemo(
    () => [
      {
        location: require('../../assets/images/test/gpst1.png'),
      },
      {
        location: require('../../assets/images/test/gpst2.png'),
      },
      {
        location: require('../../assets/images/test/gpst3.png'),
      },
      {
        location: require('../../assets/images/test/gpst4.png'),
      },
    ],
    [],
  )

  // memo
  // memo
  // memo

  const imageList = useMemo(() => {
    return images.map((v, i) => {
      return {...v, key: `imageSlider-${i}`}
    })
  }, [images])
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
  })
  return (
    <>
      <Header />
      <ScrollView>
        <View {...style.center}>
          <ImageSmallSlider images={images} />
          <View {...style.textBox}>
            <Text {...style.title}>{testLang?.name}</Text>
            <View {...style.line}></View>
            <Text {...style.describe}>{testLang?.description}</Text>
            <Text {...style.title}>{isEng ? 'Contest Date' : '응시일'}</Text>
            <Text {...style.describe}>{resultDate}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default Description
