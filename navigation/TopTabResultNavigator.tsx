import React, {useEffect, useMemo, useState} from 'react'
import {useRecoilValue} from 'recoil'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {Text} from 'react-native'
import {LangMap2, ResultParamList, ResultStackParams, SC} from '../type'
import {langState} from '../atoms/lang'
import useGetStyle from '../hooks/use-style'
import {useIsFocused} from '@react-navigation/native'
import {ResultDetailInfoState} from '../atoms/resultDetailInfo'
import useResultDetailInfo from '../hooks/useResultDetailInfo'
import MobileMyAnswer from '../component/MobileMyAnswer'
import MobileCompetence from '../component/MobileCompetence'
import MobileDomainSpecifics from '../component/MobileDomainSpecifics'
import MobileOverallEvaluation from '../component/MobileOverallEvaluation'
import _ from 'lodash'
import MobileAi from '../component/MobileAi'
const Tab = createMaterialTopTabNavigator<ResultParamList>()
const globalText: LangMap2 = {
  en: {
    myanswer: 'My Answer',
    compentence: 'Competence',
    domain: 'Domain Specifics',
    overAll: 'overall Evaluation',
    aiRecommendation: 'Ai Recommendations',
  },
  ko: {
    myanswer: '내 점수',
    compentence: '역량',
    domain: '지식 영역',
    overAll: '총평',
    aiRecommendation: 'AI 추천',
  },
}
type paramsType = {
  testName: string
  times: number
  level: string
}
const TopTabResultNavigator: SC<ResultStackParams, 'ResultDetail'> = ({
  navigation,
  route,
}) => {
  const language = useRecoilValue(langState)
  const style = useGetStyle({
    BoxText1: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 12,
      lineHeight: 24,
      textAlign: 'center',
      letterSpacing: 0.1,
      color: '#4AC1E8',
    },
    BoxText2: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 12,
      lineHeight: 24,
      textAlign: 'center',
      letterSpacing: 0.1,
      color: '#999999',
    },
  })
  //DATA
  //DATA
  //DATA
  const isFocused = useIsFocused()

  const params = route.params as paramsType

  const resultDetailData = useRecoilValue(ResultDetailInfoState)

  const {mutate: resultDetailInfoListMutate} = useResultDetailInfo()
  useEffect(() => {
    if (params) {
      const body = {
        testName: params.testName.split(' ')[0],
        level: params.level,
        times: params.times,
      }
      resultDetailInfoListMutate(body)
    }
  }, [params, resultDetailInfoListMutate])
  const [activeTrophy, setActiveTrophy] = useState(0)

  //MEMO
  //MEMO
  //MEMO
  const name = useMemo(
    () => resultDetailData?.resultInfo.user.name || '',
    [resultDetailData],
  )

  const score = useMemo(() => {
    return resultDetailData?.resultInfo.scoreMap.score.score
  }, [resultDetailData?.resultInfo.scoreMap.score.score])

  const worldPercentage = useMemo(
    () => resultDetailData?.resultInfo.scoreMap.score.world.topPercentage,
    [resultDetailData?.resultInfo.scoreMap.score.world.topPercentage],
  )

  useEffect(() => {
    if (!worldPercentage) {
      return
    }
    if (score === 100) {
      setActiveTrophy(6)
    } else if (worldPercentage >= 0 && worldPercentage <= 4) {
      setActiveTrophy(5)
    } else if (worldPercentage > 4 && worldPercentage <= 11) {
      setActiveTrophy(4)
    } else if (worldPercentage > 11 && worldPercentage <= 23) {
      setActiveTrophy(3)
    } else if (worldPercentage > 23 && worldPercentage <= 40) {
      setActiveTrophy(2)
    } else if (worldPercentage > 40) {
      setActiveTrophy(1)
    }
  }, [activeTrophy, score, worldPercentage])
  useEffect(() => {
    if (!isFocused) {
      navigation.pop()
    }
  }, [isFocused, navigation])

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarStyle: {
          backgroundColor: '#fff',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#4AC1E8',
        },
      }}
      initialRouteName={'MobileMyAnswer'}
    >
      <Tab.Screen
        name="MobileMyAnswer"
        component={MobileMyAnswer}
        initialParams={{
          testName: params.testName.split(' ')[0],
          times: params.times,
          level: params.level,
          activeTrophy,
        }}
        options={{
          tabBarLabel: ({focused}) =>
            focused ? (
              <Text {...style.BoxText1}>{globalText[language].myanswer}</Text>
            ) : (
              <Text {...style.BoxText2}>{globalText[language].myanswer}</Text>
            ),
        }}
      />
      <Tab.Screen
        name="MobileCompetence"
        component={MobileCompetence}
        initialParams={{
          name,
        }}
        options={{
          tabBarLabel: ({focused}) =>
            focused ? (
              <Text {...style.BoxText1}>
                {globalText[language].compentence}
              </Text>
            ) : (
              <Text {...style.BoxText2}>
                {globalText[language].compentence}
              </Text>
            ),
        }}
      />
      <Tab.Screen
        name="MobileDomainSpecifics"
        component={MobileDomainSpecifics}
        initialParams={{
          userName: name,
        }}
        options={{
          tabBarLabel: ({focused}) =>
            focused ? (
              <Text {...style.BoxText1}>{globalText[language].domain}</Text>
            ) : (
              <Text {...style.BoxText2}>{globalText[language].domain}</Text>
            ),
        }}
      />
      <Tab.Screen
        name="MobileOverallEvaluation"
        component={MobileOverallEvaluation}
        initialParams={{
          userName: name,
        }}
        options={{
          tabBarLabel: ({focused}) =>
            focused ? (
              <Text {...style.BoxText1}>{globalText[language].overAll}</Text>
            ) : (
              <Text {...style.BoxText2}>{globalText[language].overAll}</Text>
            ),
        }}
      />
      <Tab.Screen
        name="MobileAi"
        component={MobileAi}
        initialParams={{
          testName: params.testName.split(' ')[0],
          times: params.times,
          level: params.level,
        }}
        options={{
          tabBarLabel: ({focused}) =>
            focused ? (
              <Text {...style.BoxText1}>
                {globalText[language].aiRecommendation}
              </Text>
            ) : (
              <Text {...style.BoxText2}>
                {globalText[language].aiRecommendation}
              </Text>
            ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TopTabResultNavigator
