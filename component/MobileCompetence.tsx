import {useMemo, useState} from 'react'
import {Text, View} from 'react-native'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
import useStyles2 from '../hooks/ use-style2'
import {LangMap2} from '../type'
import {Result} from '../type/result'
import dbString from '../lib/database-result/gpst/dbStringVar'
import _ from 'lodash'
import CompetenceGraph from './CompetenceGraph'
import Svg, {Circle, Defs, Line, Path} from 'react-native-svg'
import CompetenceClickGraph from './CompetenceClickGraph'
type Props = {
  data: {
    resultInfo?: Result.DetailDataType['resultInfo']
    resultComment: Result.DetailDataType['resultComment']
    name: string
  }
}
const MobileCompetence = ({data: {resultInfo, resultComment, name}}: Props) => {
  // data
  // data
  // data
  const [active, setActive] = useState(0)
  const lang = useRecoilValue(langState) as 'en' | 'ko'
  const [achievementEn, setAchievementEn] = useState('')
  const [achievementKo, setAchievementKo] = useState('')
  const [ScoreTypeEn, setScoreTypeEn] = useState('')
  const [ScoreTypeKo, setScoreTypeKo] = useState('')
  const {getStyles, styles} = useStyles2({
    wrapper: {paddingVertical: 32, flex: 1},
    test2: {borderRadius: 100},
    competenceGraphBarOverall: {
      // fill: 'none',
      // strokeWidth: 2em,
      // stroke-dashoffset: 548,
      // stroke-dasharray: 730,
      // transform-origin: center,
    },
  })
  // method
  // method
  // method
  const [globalText] = useState<LangMap2>({
    ko: {
      competenceDescription:
        '사회의 변화에 대응하고, 긍정적인 변화를 주도할 수 있는 종합적 문제해결력을 갖추기 위해 필수적인 4가지 핵심역량을 평가합니다. 각 영역을 클릭해보세요!',
      creativeThinking: '창의력',
      communicationCollaboration: '의사소통 및 협업 능력',
      logicalCriticalthinking: '논리·비판적사고력',
      informationMediaDigitalliteracy: '정보 미디어 디지털 역량',
      compentenceTitle: '역량',
    },
    en: {
      competenceDescription:
        'This test evaluates four key competencies that are essential for comprehensive problem-solving skills that respond to social changes and lead positive change. Click the chart!',
      creativeThinking: 'Creative Thinking',
      communicationCollaboration: 'Communication & Collaboration',
      logicalCriticalthinking: 'Logical & Critical thinking',
      informationMediaDigitalliteracy: 'Information, Media, Digital literacy',
      compentenceTitle: 'Compentence',
    },
  })

  function clickSVG(num: number) {
    return () => {
      setActive(num)
    }
  }

  //renderMap
  //renderMap
  //renderMap
  const textLang = useMemo(() => {
    switch (lang) {
      case 'en':
        return 'text_en'
      case 'ko':
        return 'text_ko'
    }
  }, [lang])

  const area = useMemo(() => {
    switch (active) {
      case 0:
        return 'com_creative'
      case 1:
        return 'com_creative'
      case 2:
        return 'com_communication'
      case 3:
        return 'com_logical'
      case 4:
        return 'com_communication'
      default:
        return 'com_creative'
    }
  }, [active])
  const areaScoreType = useMemo(() => {
    switch (area) {
      case 'com_creative':
        return 'com_creativeScore'
      case 'com_communication':
        return 'com_communicationScore'
      case 'com_logical':
        return 'com_logicalScore'
      default:
        return 'com_creativeScore'
    }
  }, [area])

  const title = useMemo(() => {
    return resultComment.competence.description[area].none[textLang].split('\n')
  }, [area, resultComment, textLang])
  const scoreTypeLang = useMemo(() => {
    switch (lang) {
      case 'en':
        return ScoreTypeEn
      case 'ko':
        return ScoreTypeKo
    }
  }, [ScoreTypeEn, ScoreTypeKo, lang])

  const achievement = useMemo(() => {
    switch (lang) {
      case 'en':
        return achievementEn
      case 'ko':
        return achievementKo
    }
  }, [achievementEn, achievementKo, lang])

  const areaScore = useMemo(() => {
    return (
      (resultInfo!.scoreMap[areaScoreType].score /
        resultInfo!.scoreMap[areaScoreType].score) *
      100
    )
  }, [areaScoreType, resultInfo])

  const subTitle = useMemo(
    () =>
      achievementEn
        ? `${dbString(
            resultComment.competence.comment.subtitle.none[textLang],
            {
              name: name,
              achievement: achievement,
              scoreType: scoreTypeLang,
            },
          )}\n${
            resultComment.competence.comment[area][achievementEn][textLang]
          }`
        : '',
    [
      achievement,
      achievementEn,
      area,
      name,
      resultComment.competence.comment,
      scoreTypeLang,
      textLang,
    ],
  )

  const topWorld = useMemo(() => {
    return dbString(
      resultComment.competence.description.topWorld.none[textLang],
      {
        /* parseInt( */
        topPercentWorld: `${
          resultInfo!.scoreMap[areaScoreType].world!.topPercentage
        }`,
        /* ) */ name: name,
      },
    )
  }, [
    areaScoreType,
    name,
    resultComment.competence.description.topWorld.none,
    resultInfo,
    textLang,
  ])

  const radial = useMemo(() => {
    // 100 = 718(164.25 + 240)
    // 0 = 164.25(164.25 + 0)
    let data = {
      imdl:
        (resultInfo!.scoreMap.com_informationScore.score /
          resultInfo!.scoreMap.com_informationScore.maxScore) *
        100,
      lct:
        (resultInfo!.scoreMap.com_logicalScore.score /
          resultInfo!.scoreMap.com_logicalScore.maxScore) *
        100,
      cc:
        (resultInfo!.scoreMap.com_communicationScore.score /
          resultInfo!.scoreMap.com_communicationScore.maxScore) *
        100,
      ct:
        (resultInfo!.scoreMap.com_creativeScore.score /
          resultInfo!.scoreMap.com_creativeScore.maxScore) *
        100,
      cimdl:
        (resultInfo!.scoreMap.com_informationScore.world.average /
          resultInfo!.scoreMap.com_informationScore.maxScore) *
        100,
      clct:
        (resultInfo!.scoreMap.com_logicalScore.world.average /
          resultInfo!.scoreMap.com_logicalScore.maxScore) *
        100,
      ccc:
        (resultInfo!.scoreMap.com_communicationScore.world.average /
          resultInfo!.scoreMap.com_communicationScore.maxScore) *
        100,
      cct:
        (resultInfo!.scoreMap.com_creativeScore.world.average /
          resultInfo!.scoreMap.com_creativeScore.maxScore) *
        100,
    }
    let {cc, ccc, cct, cimdl, clct, ct, imdl, lct} = _(data)
      .mapValues(
        (v, key) =>
          164.25 +
          (101.25 *
            (/(imdl|(?!l)ct)$/.test(key) && !/lct$/.test(key) ? -v : v)) /
            100,
      )
      .value()
    let [imdlP, lctP, ccP, ctP, imdlPC, lctPC, ccPC, ctPC] = [
      imdl,
      lct,
      cc,
      ct,
      cimdl,
      clct,
      ccc,
      cct,
    ]
    return (
      <>
        <CompetenceGraph
          imdlP={imdlP}
          lctP={lctP}
          ccP={ccP}
          ctP={ctP}
          imdlPC={imdlPC}
          lctPC={lctPC}
          ccPC={ccPC}
          ctPC={ctPC}
        />
      </>
    )
  }, [resultInfo])
  // console.log(radial)

  return (
    <View style={[styles.wrapper]}>
      <Svg viewBox="0 0 328.5 328.5" width="328.5" height="328.5">
        <CompetenceClickGraph
          data={{clickSVG, active, setActive, globalText}}
        />
        {radial}
      </Svg>
      {/* <Text>jofsdija</Text> */}
    </View>
  )
}

export default MobileCompetence
