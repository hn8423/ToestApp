import {useEffect, useMemo, useState} from 'react'
import {Text, TouchableOpacity, View, Image, Dimensions} from 'react-native'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
import useStyles2 from '../hooks/ use-style2'
import {LangMap2} from '../type'
import {Result} from '../type/result'
import dbString from '../lib/database-result/gpst/dbStringVar'
import _ from 'lodash'
import CompetenceGraph from './CompetenceGraph'
import Svg from 'react-native-svg'
import CompetenceClickGraph from './CompetenceClickGraph'
const chartWidth = Dimensions.get('window').width

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
    wrapper: {padding: 16, flex: 1},
    whiteBox: {
      marginTop: 16,
      backgroundColor: '#fff',
      padding: 24,
      borderRadius: 8,
    },
    cardBox: {
      marginTop: 16,
      backgroundColor: '#fff',
      paddingVertical: 24,
      borderRadius: 8,
    },
    title: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
    },
    CompetenceText: {
      color: '#191919',
      paddingBottom: 16,
    },
    captionSub: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: '#393939',
    },
    cardTitle: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
      textTransform: 'capitalize',
      color: '#191919',
      marginBottom: 16,
      paddingHorizontal: 24,
    },
    svgWrapper: {
      width: '100%',
      alignItems: 'center',
      position: 'relative',
    },
    caption: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    captionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: 100,
    },
    captionDot: {
      width: 12,
      height: 12,
      borderRadius: 50,
      marginRight: 8,
    },
    cardInner: {
      paddingHorizontal: 24,
    },
    cardHr: {
      width: chartWidth - 80,
      height: 2,
      backgroundColor: '#dbdbdb',
      marginHorizontal: 24,
      marginVertical: 8,
    },
    myScore: {backgroundColor: '#4AC1E8'},
    average: {backgroundColor: '#CFD6E4'},
    graphClick: {
      position: 'absolute',
      width: 40,
      height: 30,
    },
    creativeThinking1: {
      top: '33%',
      left: '39.5%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '-35deg'}],
    },

    creativeThinking2: {
      top: '27.5%',
      left: '52%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '-10deg'}],
    },

    creativeThinking3: {
      top: '27.5%',
      right: '22%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '10deg'}],
    },
    creativeThinking4: {
      top: '33%',
      right: '9.5%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '35deg'}],
    },
    logical1: {
      bottom: '3%',
      right: '9.5%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '-35deg'}],
    },

    logical2: {
      bottom: '-2%',
      right: '22%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '-10deg'}],
    },

    logical3: {
      bottom: '-2%',
      left: '52%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '10deg'}],
    },
    logical4: {
      bottom: '3%',
      left: '40%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '35deg'}],
    },
    communication1: {
      top: '42%',
      right: '-2.5%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '50deg'}],
    },

    communication2: {
      top: '54%',
      right: '-8%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '75deg'}],
    },

    communication3: {
      bottom: '23.5%',
      right: '-8%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '-80deg'}],
    },
    communication4: {
      bottom: '11%',
      right: '-2.5%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '-50deg'}],
    },
    information1: {
      bottom: '12%',
      left: '30.5%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '50deg'}],
    },

    information2: {
      bottom: '24%',
      left: '25%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '75deg'}],
    },

    information3: {
      bottom: '38%',
      left: '25%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '-80deg'}],
    },
    information4: {
      bottom: '51%',
      left: '30%',
      transform: [{translateX: -50}, {translateY: -50}, {rotate: '-50deg'}],
    },
    cardImageWrapper: {
      position: 'relative',
      width: '100%',
      height: 128,
      backgroundColor: '#EFF2F5',
      marginBottom: 24,
    },
    cardImage: {
      position: 'absolute',
      left: '5%',
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

  function clickSVG(num: React.SetStateAction<number>) {
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

  const imageCardContent = useMemo(() => {
    switch (active) {
      case 1:
        return require('../assets/images/result/competence/create.png')
      case 2:
        return require('../assets/images/result/competence/communication.png')
      case 3:
        return require('../assets/images/result/competence/logical.png')
      case 4:
        return require('../assets/images/result/competence/infomation.png')
    }
  }, [active])

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
      <CompetenceGraph
        clickSvg={clickSVG}
        imdlP={imdlP}
        lctP={lctP}
        ccP={ccP}
        ctP={ctP}
        imdlPC={imdlPC}
        lctPC={lctPC}
        ccPC={ccPC}
        ctPC={ctPC}
      />
    )
  }, [resultInfo])

  // effect
  // effect
  // effect
  useEffect(() => {
    if (areaScore >= 80) {
      setAchievementEn('excellent')
      setAchievementKo('뛰어난')
    } else if (areaScore >= 60) {
      setAchievementEn('high')
      setAchievementKo('좋은')
    } else if (areaScore >= 40) {
      setAchievementEn('average')
      setAchievementKo('보통')
    } else {
      setAchievementEn('basic')
      setAchievementKo('기초적인')
    }
  }, [areaScore, resultComment])

  useEffect(() => {
    switch (active) {
      case 0:
        setScoreTypeEn('Creative Thinking')
        setScoreTypeKo('창의력')
      case 1:
        setScoreTypeEn('Creative Thinking')
        setScoreTypeKo('창의력')
      // return 'com_creative'
      case 2:
        setScoreTypeEn('Communication & Collaboration')
        setScoreTypeKo('의사소통 및 협업 능력')
      case 3:
        setScoreTypeEn('Logical & Critical thinking')
        setScoreTypeKo('논리·비판적사고력')
      case 4:
        setScoreTypeEn('Information, Media, Digital literacy')
        setScoreTypeKo('정보 미디어 디지털 역량')
    }
  }, [active])
  return (
    <View style={[styles.wrapper]}>
      <View style={[styles.whiteBox]}>
        <Text style={[styles.title, styles.CompetenceText]}>
          {globalText[lang].compentenceTitle}
        </Text>
        <Text style={[styles.captionSub]}>
          {globalText[lang].competenceDescription}
        </Text>
        <View style={[styles.svgWrapper]} pointerEvents="box-none">
          <Svg viewBox="0 0 328.5 328.5" width="328.5" height="328.5">
            <CompetenceClickGraph
              data={{clickSVG, active, setActive, globalText}}
            />
            {radial}
          </Svg>
          <TouchableOpacity
            style={[styles.creativeThinking1, styles.graphClick]}
            onPress={clickSVG(1)}
          />
          <TouchableOpacity
            style={[styles.creativeThinking2, styles.graphClick]}
            onPress={clickSVG(1)}
          />

          <TouchableOpacity
            style={[styles.creativeThinking3, styles.graphClick]}
            onPress={clickSVG(1)}
          />
          <TouchableOpacity
            style={[styles.creativeThinking4, styles.graphClick]}
            onPress={clickSVG(1)}
          />
          <TouchableOpacity
            style={[styles.communication1, styles.graphClick]}
            onPress={clickSVG(2)}
          />
          <TouchableOpacity
            style={[styles.communication2, styles.graphClick]}
            onPress={clickSVG(2)}
          />
          <TouchableOpacity
            style={[styles.communication3, styles.graphClick]}
            onPress={clickSVG(2)}
          />
          <TouchableOpacity
            style={[styles.communication4, styles.graphClick]}
            onPress={clickSVG(2)}
          />
          <TouchableOpacity
            style={[styles.logical1, styles.graphClick]}
            onPress={clickSVG(3)}
          />
          <TouchableOpacity
            style={[styles.logical2, styles.graphClick]}
            onPress={clickSVG(3)}
          />
          <TouchableOpacity
            style={[styles.logical3, styles.graphClick]}
            onPress={clickSVG(3)}
          />
          <TouchableOpacity
            style={[styles.logical4, styles.graphClick]}
            onPress={clickSVG(3)}
          />
          <TouchableOpacity
            style={[styles.information1, styles.graphClick]}
            onPress={clickSVG(4)}
          />
          <TouchableOpacity
            style={[styles.information2, styles.graphClick]}
            onPress={clickSVG(4)}
          />
          <TouchableOpacity
            style={[styles.information3, styles.graphClick]}
            onPress={clickSVG(4)}
          />
          <TouchableOpacity
            style={[styles.information4, styles.graphClick]}
            onPress={clickSVG(4)}
          />
        </View>
        <View style={[styles.caption]}>
          <View style={[styles.captionItem]}>
            <View style={[styles.captionDot, styles.myScore]} />
            <Text>My Score</Text>
          </View>

          <View style={[styles.captionItem]}>
            <View style={[styles.captionDot, styles.average]} />
            <Text>AVERAGE</Text>
          </View>
        </View>
      </View>
      {active !== 0 && (
        <View style={[styles.cardBox]}>
          <Text style={[styles.cardTitle]}>{title[0]}</Text>
          <View style={[styles.cardImageWrapper]}>
            <Image style={[styles.cardImage]} source={imageCardContent} />
          </View>
          <Text style={[styles.cardInner, styles.captionSub]}>{title[1]}</Text>
          <View style={[styles.cardHr]} />
          <Text style={[styles.cardInner, styles.captionSub]}>{topWorld}</Text>
          <Text style={[styles.cardInner, styles.captionSub]}>{subTitle}</Text>
        </View>
      )}
    </View>
  )
}

export default MobileCompetence
