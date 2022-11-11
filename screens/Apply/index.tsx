import React from 'react'
import {View, Text, Dimensions, Image, ScrollView} from 'react-native'
import {NavigationProps, LangMap2, SC, ApplyStackParams} from '../../type'
import {useRecoilValue} from 'recoil'
import {langState} from '../../atoms/lang'
import useGetStyle from '../../hooks/use-style'
import Header from '../../component/Header'
import {useQuery} from '@tanstack/react-query'
import {testList} from '../../api/apply'
import Card from '../../component/Card'
const chartWidth = Dimensions.get('window').width
const globalText: LangMap2 = {
  description1: {
    en: 'Used a research-validated assessment tool,',
    ko: '연구로 검증된 평가도구를 사용하여',
  },
  description2: {
    en: 'process that is ongoing, cumulative,',
    ko: '진단과 분석, 그리고 피드백을 제공합니다.',
  },

  description4: {
    en: 'and language that test taker understands.',
    ko: '',
  },
  test: {
    en: 'TEST',
    ko: '응시 목록',
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
const Apply: SC<ApplyStackParams, 'ApplyStack'> = ({navigation}) => {
  //data
  //data
  //data

  const {data, isLoading} = useQuery<QueryKeyTestList[], Error>({
    queryKey: ['testlist'],
    queryFn: testList,
  })
  const lang = useRecoilValue(langState) as 'en' | 'ko'

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
    text: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
      color: '#4AC1E8',
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
                <Text {...style.titleColor}>D</Text>
                <Text {...style.title}>iscover,</Text>
              </View>
              <View {...style.titleWrapper}>
                <Text {...style.titleColor}>E</Text>
                <Text {...style.title}>valuate,</Text>
              </View>
              <View {...style.titleWrapper}>
                <Text {...style.titleColor}>T</Text>
                <Text {...style.title}>ake action</Text>
              </View>
              <View>
                <Text {...style.sub}>{globalText.description1[lang]}</Text>
                <Text {...style.sub}>{globalText.description2[lang]}</Text>
                <Text {...style.sub}>{globalText.description4[lang]}</Text>
              </View>
            </View>
            <View {...style.brithtness}></View>
            <Image
              {...style.mainImg}
              source={require('../../assets/images/apply/main.png')}
            />
          </View>
          <View {...style.bottomWrapper}>
            <Text {...style.text}>{globalText.test[lang]}</Text>
            <View {...style.cardWrapper}>
              {data &&
                data.map((v, i) => {
                  return (
                    <Card
                      key={i}
                      title={v.name}
                      description={v.shortDescription}
                      times={v.times}
                      navigation={navigation}
                      routeName="ApplyDetail"
                    />
                  )
                })}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default Apply
