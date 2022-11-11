import React from 'react'
import {View, Text, Dimensions, Image, ScrollView} from 'react-native'
import {NavigationProps, LangMap2} from '../../type'
import {useRecoilValue} from 'recoil'
import {langState} from '../../atoms/lang'
import useGetStyle from '../../hooks/use-style'
import Header from '../../component/Header'
import {useQuery} from '@tanstack/react-query'
import {testList} from '../../api/apply'
import Card from '../../component/Card'
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
            <Text {...style.text}>{globalText.test2[lang]}</Text>
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
                      routeName="TestDetail"
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

export default Test
