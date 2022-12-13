import {useMemo, useState} from 'react'
import {
  ScrollView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
import {ResultDetailInfoState} from '../atoms/resultDetailInfo'
import useGetStyle from '../hooks/use-style'
import MobileAi from './MobileAi'
import MobileCompetence from './MobileCompetence'
import MobileDomainSpecifics from './MobileDomainSpecifics'
import MobileMyAnswer from './MobileMyAnswer'
import MobileOverallEvaluation from './MobileOverallEvaluation'
const chartWidth = Dimensions.get('window').width
import _ from 'lodash'
import useAIRecommend from '../hooks/useAIRecommend'

type Props = {
  testName: string
  times: number
  level: string
  name: string
  activeTrophy: number
}
type Obj = {
  [x: number]: string | JSX.Element
}

const MobileTab = ({testName, times, level, name, activeTrophy}: Props) => {
  const resultDetailData = useRecoilValue(ResultDetailInfoState)
  const lang = useRecoilValue(langState) as 'en' | 'ko'

  const [activeTab, setActiveTab] = useState(1)
  const globalText = {
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
  function change(id: number) {
    return () => {
      setActiveTab(id)
    }
  }

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
  // console.log(obtainBadgeStrong)
  const aiRecommendation = useAIRecommend({
    data: resultDetailData?.resultAIRecommendation,
    badgeList: obtainBadgeStrong,
    userId: resultDetailData?.resultUserId,
    testName,
    times,
    level,
  })

  //MEMO
  //MEMO
  //MEMO
  const obj: Obj = useMemo(
    () => ({
      1: (
        <MobileMyAnswer
          data={{
            resultInfo: resultDetailData?.resultInfo,
            testName,
            times,
            level,
            activeTrophy,
          }}
        />
      ),
      2: (
        <MobileCompetence
          data={{
            resultInfo: resultDetailData?.resultInfo,
            resultComment: resultDetailData?.resultComment,
            name,
          }}
        />
      ),
      3: (
        <MobileDomainSpecifics
          data={{
            resultInfo: resultDetailData?.resultInfo,
            resultComment: resultDetailData?.resultComment,
            userName: name,
          }}
        />
      ),
      4: (
        <MobileOverallEvaluation
          data={{
            resultInfo: resultDetailData?.resultInfo,
            resultComment: resultDetailData?.resultComment,
            userName: name,
          }}
        />
      ),
      5: (
        <MobileAi
          data={{
            resultInfo: resultDetailData?.resultInfo,
            aiRecommendation,
          }}
        />
      ),
    }),
    [
      activeTrophy,
      aiRecommendation,
      level,
      name,
      resultDetailData?.resultComment,
      resultDetailData?.resultInfo,
      testName,
      times,
    ],
  )

  const active = useMemo(() => obj[activeTab], [activeTab, obj])
  //STYLE
  //STYLE
  //STYLE
  const style = useGetStyle({
    wrapper: {
      flexDirection: 'column',
    },
    tabBar: {
      height: 48,
      backgroundColor: '#fff',
      minWidth: chartWidth,
      flexDirection: 'row',
    },
    tabButton1: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      paddingVertical: 12,
      borderBottomColor: activeTab === 1 ? '#4AC1E8' : '#fff',
      borderBottomWidth: 2,
    },
    tabButton2: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      paddingVertical: 12,
      borderBottomColor: activeTab === 2 ? '#4AC1E8' : '#fff',
      borderBottomWidth: 2,
    },
    tabButton3: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      paddingVertical: 12,
      borderBottomColor: activeTab === 3 ? '#4AC1E8' : '#fff',
      borderBottomWidth: 2,
    },
    tabButton4: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      paddingVertical: 12,
      borderBottomColor: activeTab === 4 ? '#4AC1E8' : '#fff',
      borderBottomWidth: 2,
    },
    tabButton5: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      paddingVertical: 12,
      borderBottomColor: activeTab === 5 ? '#4AC1E8' : '#fff',
      borderBottomWidth: 2,
    },
    tabText1: {
      color: activeTab === 1 ? '#4AC1E8' : '#999999',
    },
    tabText2: {
      color: activeTab === 2 ? '#4AC1E8' : '#999999',
    },
    tabText3: {
      color: activeTab === 3 ? '#4AC1E8' : '#999999',
    },
    tabText4: {
      color: activeTab === 4 ? '#4AC1E8' : '#999999',
    },
    tabText5: {
      color: activeTab === 5 ? '#4AC1E8' : '#999999',
    },
  })

  return (
    <ScrollView>
      <View {...style.wrapper}>
        <ScrollView horizontal={true}>
          <View {...style.tabBar}>
            <TouchableOpacity onPress={change(1)}>
              <View {...style.tabButton1}>
                <Text {...style.tabText1}>{globalText[lang].myanswer}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={change(2)}>
              <View {...style.tabButton2}>
                <Text {...style.tabText2}>{globalText[lang].compentence}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={change(3)}>
              <View {...style.tabButton3}>
                <Text {...style.tabText3}>{globalText[lang].domain}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={change(4)}>
              <View {...style.tabButton4}>
                <Text {...style.tabText4}>{globalText[lang].overAll}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={change(5)}>
              <View {...style.tabButton5}>
                <Text {...style.tabText5}>
                  {globalText[lang].aiRecommendation}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View>{active}</View>
      </View>
    </ScrollView>
  )
}

export default MobileTab
