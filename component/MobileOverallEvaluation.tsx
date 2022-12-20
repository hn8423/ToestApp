import {useMemo, useState} from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
import {Result} from '../type/result'
import {LangMap2} from '../type'
import dbStringVar from '../lib/database-result/gpst/dbStringVar'
import correctQuestionDescriptionList from '../lib/database-result/gpst/client-correctQuestionDescriptionList'
import _ from 'lodash'
import useStyles2 from '../hooks/ use-style2'

type Props = {
  data: {
    resultInfo?: Result.DetailDataType['resultInfo']
    resultComment: Result.DetailDataType['resultComment']
    userName: string
  }
}

type ScoreGaradeType = {
  [x in string]: {
    ko: string
    en: string
  }
}

const MobileOverallEvaluation = ({
  data: {resultInfo, resultComment, userName},
}: Props) => {
  const {styles} = useStyles2({
    wrapper: {padding: 16, flex: 1},
    whiteBox: {
      marginVertical: 16,
      padding: 24,
      backgroundColor: '#fff',
      borderRadius: 8,
    },
    whiteSmallBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 16,
      padding: 24,
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#dbdbdb',
    },
    bedgeImage: {
      width: 88,
      height: 88,
    },
    bedgeTextWrapper: {
      alignItems: 'center',
      width: 150,
    },

    titleWrapper: {
      flexDirection: 'row',
      marginBottom: 24,
    },
    textWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    titleFont: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
    },
    subFont: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
    },
    bedgeFont: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 1.25,
    },
    strengthsFont: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.25,
      paddingBottom: 24,
    },
    subcolor: {
      color: '#393939',
    },
    bluetitle: {
      color: '#4AC1E8',
    },
    blacktitle: {
      color: '#191919',
    },
    moreReadWrapper: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      height: 50,
    },
    moreReadText: {
      paddingBottom: 5,
    },
    strengthWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    strengthImg: {
      marginTop: 4,
      marginRight: 10,
    },
  })
  const [moreRead, setMoreRead] = useState(false)

  //toggle
  //toggle
  //toggle

  function moreReadClick() {
    setMoreRead(true)
  }
  function foldClick() {
    setMoreRead(false)
  }

  //data
  //data
  //data
  const lang = useRecoilValue(langState) as 'en' | 'ko'

  const [globalText] = useState<LangMap2>({
    and: {ko: ' , ', en: ' and '},
    artHumanTitle: {en: 'Art & Humanities', ko: '예술인문'},
    socialScienceTitle: {en: 'Social Science', ko: '사회경제'},
    physicalScienceTitle: {
      en: 'Physical science, Technology and Engineering',
      ko: '과학기술공학',
    },
    healthGlobalEnvironmentTitle: {
      en: 'Health and Global Environment',
      ko: '건강 및 지구촌 환경',
    },

    informationMediaDigitalLiteracyTitle: {
      en: 'Information, Media, Digital Literacy',
      ko: '정보 미디어 디지털 역량',
    },
    creativeThinkingTitle: {en: 'Creative Thinking', ko: '창의력'},
    logicalCriticalThinkingTitle: {
      en: 'Logical & Critical Thinking',
      ko: '논리·비판적사고력',
    },
    communicationCollaborationTitle: {
      en: 'Communication & Collaboration',
      ko: '의사소통 및 협업 능력',
    },
    fold: {en: 'Fold', ko: '접기'},
    more: {en: 'View more', ko: '더 보기'},
    ovelAllBlue: {en: 'overAll', ko: ''},
    evaluation: {en: 'Evaluation', ko: '총평'},
  })
  const globalText2 = {
    en: {ovelAllBlue: 'overAll', evaluation: 'Evaluation'},
    ko: {ovelAllBlue: '', evaluation: '총평'},
  }

  const textLang = useMemo(() => {
    if (lang === 'ko') {
      return 'text_ko'
    } else if (lang === 'en') {
      return 'text_en'
    }
    return 'text_en'
  }, [lang])

  const dataList = useMemo(() => {
    return [
      {
        name: globalText.artHumanTitle[lang],
        score: resultInfo!.scoreMap.dom_artHumanScore,
        img: require('../assets/images/result/overAll/domain/artHuman.png'),
      },
      {
        name: globalText.healthGlobalEnvironmentTitle[lang],
        score: resultInfo!.scoreMap.dom_healthGlobalScore,
        img: require('../assets/images/result/overAll/domain/healthGlobalEnvironment.png'),
      },
      {
        name: globalText.socialScienceTitle[lang],
        score: resultInfo!.scoreMap.dom_socialScienceScore,
        img: require('../assets/images/result/overAll/domain/socialScience.png'),
      },
      {
        name: globalText.physicalScienceTitle[lang],
        score: resultInfo!.scoreMap.dom_technologyScore,
        img: require('../assets/images/result/overAll/domain/physicalScienceEngineering.png'),
      },
    ]
  }, [globalText, lang, resultInfo])

  const competenceDataList = useMemo(() => {
    return [
      {
        name: globalText.informationMediaDigitalLiteracyTitle[lang],
        score: resultInfo!.scoreMap.com_communicationScore.achievement,
        img: require('../assets/images/result/overAll/compentence/communicationCollaboration.png'),
      },
      {
        name: globalText.creativeThinkingTitle[lang],
        score: resultInfo!.scoreMap.com_creativeScore.achievement,
        img: require('../assets/images/result/overAll/compentence/creativeThinking.png'),
      },
      {
        name: globalText.logicalCriticalThinkingTitle[lang],
        score: resultInfo!.scoreMap.com_informationScore.achievement,
        img: require('../assets/images/result/overAll/compentence/informationDigitalLiteracy.png'),
      },
      {
        name: globalText.communicationCollaborationTitle[lang],
        score: resultInfo!.scoreMap.com_logicalScore.achievement,
        img: require('../assets/images/result/overAll/compentence/logicalCriticalThinking.png'),
      },
    ]
  }, [resultInfo, globalText, lang])

  const [scoreGrade] = useState<ScoreGaradeType>({
    excellent: {ko: `'아주높음'`, en: `'Excellent'`},
    high: {ko: `'높음'`, en: `'High'`},
    satisfactory: {ko: `'다소 높음'`, en: `'Satisfactory'`},
    average: {ko: `'보통'`, en: 'Average'},
    needImprovement: {ko: `'낮음'`, en: `'Need improvment'`},
  })

  //memo
  //memo
  //memo

  const topPercentage = useMemo(
    () => resultInfo!.scoreMap.score.world.topPercentage,
    [resultInfo],
  )

  const compareScore = useMemo(() => {
    let result = 'excellent'

    if (topPercentage <= 11) {
      result = 'excellent'
    } else if (topPercentage <= 23) {
      result = 'high'
    } else if (topPercentage <= 40) {
      result = 'satisfactory'
    } else if (topPercentage <= 60) {
      result = 'average'
    } else {
      result = 'needImprovement'
    }

    return result
  }, [topPercentage])

  const koName = useMemo(
    () => (lang === 'ko' ? userName : ''),
    [lang, userName],
  )
  const deleteName = useMemo(() => (lang === 'ko' ? '' : ''), [lang])
  const scoreGradeLang = useMemo(
    () => scoreGrade[compareScore][lang],
    [compareScore, lang, scoreGrade],
  )

  // comment
  // comment
  // comment

  const testComment = useMemo(() => {
    return resultComment.overAll.comment.test
  }, [resultComment.overAll.comment.test])

  const commentByscoreGrade = useMemo(() => {
    return testComment[compareScore][textLang]
  }, [testComment, compareScore, textLang])

  const totalComment = useMemo(() => {
    return dbStringVar(resultComment.overAll.comment.total.none[textLang], {
      name: koName,
    })
  }, [koName, resultComment.overAll.comment.total.none, textLang])

  const commentTotalsplitAll = useMemo(() => {
    return splitAll(totalComment, [`'|_testScore_|'`, `'|_achievement_|'`])
  }, [totalComment])

  const commentTotalSplitForBr = useMemo(() => {
    return commentTotalsplitAll[2].split('\n')
  }, [commentTotalsplitAll])

  const displayComment = useMemo(
    () => commentByscoreGrade.replace(/\n/g, ' ').replace(/\. /g, '.\n\n'),
    [commentByscoreGrade],
  )

  const domainComment = useMemo(() => {
    return dbStringVar(
      resultComment.overAll.comment.domainSpecific.none[textLang],
      {name: koName},
    )
  }, [koName, resultComment.overAll.comment.domainSpecific.none, textLang])

  const domainCommentSplit = useMemo(() => {
    return domainComment.split('|_badgeList_|')
  }, [domainComment])

  const competenceComment = useMemo(() => {
    return dbStringVar(resultComment.overAll.comment.competence.none[textLang])
  }, [resultComment.overAll.comment.competence.none, textLang])

  const competenceCommentSplit = useMemo(() => {
    return competenceComment.split('|_topCompetenceList_|')
  }, [competenceComment])

  // domain
  // domain
  // domain

  const dataListOrderByAchievement = useMemo(
    () =>
      _(dataList)
        .orderBy(v => v.score.achievement, 'desc')
        .value(),
    [dataList],
  )
  const top2Data = useMemo(
    () => dataListOrderByAchievement.slice(0, 2),
    [dataListOrderByAchievement],
  )
  const top2DataForNotZero = useMemo(() => {
    let arr = top2Data.filter(data => data.score.score)
    return arr
  }, [top2Data])
  const dataListFor80Over = useMemo(
    () =>
      _(dataListOrderByAchievement)
        .filter(v => v.score.achievement >= 80)
        .value(),
    [dataListOrderByAchievement],
  )
  const displayDataList = useMemo(() => {
    let is80OverDisplay = dataListFor80Over.length > 2
    return is80OverDisplay ? dataListFor80Over : top2DataForNotZero
  }, [dataListFor80Over, top2DataForNotZero])

  const top2AchievementMap = useMemo(() => {
    let temp = displayDataList.map((v, i) => [
      <Text
        style={[styles.bluetitle]}
        key={`top2AchievementMap-${v.name}-${i}`}
      >
        {v.name}
      </Text>,
      <Text key={`top2AchievementMap-space-${v.name}-${i}`}>
        {globalText.and[lang]}
      </Text>,
    ])
    return temp.flat().slice(0, -1)
  }, [displayDataList, globalText.and, lang, styles.bluetitle])

  const domainTopAcievementMap = useMemo(() => {
    return displayDataList.map((v, i) => {
      return (
        <View style={styles.whiteSmallBox} key={v.name}>
          <Image style={styles.bedgeImage} source={v.img} />
          <View style={styles.bedgeTextWrapper}>
            <Text style={[styles.bedgeFont, styles.blacktitle]}>{v.name}</Text>
          </View>
        </View>
      )
    })
  }, [displayDataList, styles])

  // competence
  // competence
  // competence

  const competenceDataListOrderByAchievement = useMemo(
    () =>
      _(competenceDataList)
        .orderBy(v => v.score, 'desc')
        .value(),
    [competenceDataList],
  )
  const competenceTop2Data = useMemo(
    () => competenceDataListOrderByAchievement.slice(0, 2),
    [competenceDataListOrderByAchievement],
  )

  const competenceTop2DataForNotZero = useMemo(() => {
    let arr = competenceTop2Data.filter(data => data.score)
    return arr
  }, [competenceTop2Data])
  const competenceDataListFor80Over = useMemo(
    () =>
      _(competenceDataListOrderByAchievement)
        .filter(v => v.score >= 80)
        .value(),
    [competenceDataListOrderByAchievement],
  )
  const competenceDisplayDataList = useMemo(() => {
    let is80OverDisplay = competenceDataListFor80Over.length > 2
    return is80OverDisplay
      ? competenceDataListFor80Over
      : competenceTop2DataForNotZero
  }, [competenceDataListFor80Over, competenceTop2DataForNotZero])

  const competenceTop2AchievementMap = useMemo(() => {
    let temp = competenceDisplayDataList.map((v, i) => [
      <Text
        style={[styles.bluetitle]}
        key={`competenceTop2AchievementMap-${v.name}-${i}`}
      >
        {v.name}
      </Text>,
      <Text key={`competenceTop2AchievementMap-space-${v.name}-${i}`}>
        {globalText.and[lang]}
      </Text>,
    ])
    return temp.flat().slice(0, -1)
  }, [competenceDisplayDataList, globalText.and, lang, styles.bluetitle])

  const competenceTopAcievementMap = useMemo(() => {
    return competenceDisplayDataList.map(v => {
      return (
        <View style={styles.whiteSmallBox} key={v.name}>
          <Image style={styles.bedgeImage} source={v.img} />
          <View style={styles.bedgeTextWrapper}>
            <Text style={[styles.bedgeFont, styles.blacktitle]}>{v.name}</Text>
          </View>
        </View>
      )
    })
  }, [
    competenceDisplayDataList,
    styles.bedgeFont,
    styles.bedgeImage,
    styles.bedgeTextWrapper,
    styles.blacktitle,
    styles.whiteSmallBox,
  ])

  // descritption
  // descritption
  // descritption

  const notEnoughComment = useMemo(() => {
    resultComment
    return !displayDataList.length
      ? resultComment.overAll.comment.notEnough.none[textLang]
      : ''
  }, [displayDataList.length, resultComment, textLang])

  const detailStrengthTitle = useMemo(() => {
    return dbStringVar(
      resultComment.overAll.description.question.none[textLang],
      {name: koName},
    )
  }, [koName, resultComment.overAll.description.question.none, textLang])

  const overAllsubTitle = useMemo(() => {
    return dbStringVar(
      resultComment.overAll.description.subtitle.none[textLang],
      {name: deleteName},
    )
  }, [deleteName, resultComment.overAll.description.subtitle.none, textLang])

  /**@type {string} */
  const zeroScoreText = useMemo(() => {
    return !displayDataList.length
      ? resultComment.overAll.comment.notEnough.none[textLang]
      : ''
  }, [displayDataList.length, resultComment, textLang])

  // renderMap
  // renderMap
  // renderMap

  const detailedStrengthDataList = useMemo(() => {
    return correctQuestionDescriptionList(resultInfo!.myAnswerInfo)
  }, [resultInfo])

  const detailedStrengthListMap = useMemo(() => {
    return detailedStrengthDataList.map((v, i) => {
      let text = v[lang]
      return (
        <View style={[styles.strengthWrapper]}>
          <Image
            style={[styles.strengthImg]}
            source={require('../assets/images/result/overAll/check.png')}
          />
          <Text style={[styles.subFont, styles.blacktitle]}>{text}</Text>
        </View>
      )
    })
  }, [
    detailedStrengthDataList,
    lang,
    styles.blacktitle,
    styles.strengthImg,
    styles.strengthWrapper,
    styles.subFont,
  ])

  // method
  // method
  // method

  /**
   * @param {string} string
   * @param {string[]} splitWords
   */
  function splitAll(string: string, splitWords: string[]) {
    let temp = [string]
    splitWords.forEach(word => {
      temp = temp.map(v => v.split(word).flat()).flat()
    })
    return temp
  }

  return (
    <View style={[styles.wrapper]}>
      <View style={[styles.whiteBox]}>
        <View style={[styles.titleWrapper]}>
          <Text style={[styles.titleFont, styles.bluetitle]}>
            {globalText2[lang].ovelAllBlue}
          </Text>
          <Text style={[styles.titleFont, styles.blacktitle]}>
            {' '}
            {globalText2[lang].evaluation}
          </Text>
        </View>
        <View style={[styles.titleWrapper]}>
          <Text style={[styles.subFont, styles.subcolor]}>
            {koName} {overAllsubTitle}
          </Text>
        </View>
        <View style={[styles.textWrapper]}>
          <Text style={[styles.subFont, styles.subcolor]}>
            {commentTotalsplitAll[0]}
            <Text style={[styles.bluetitle]}>
              {resultInfo!.scoreMap.score.score}
            </Text>
            {commentTotalsplitAll[1]}
            <Text style={[styles.bluetitle]}>{` ${scoreGradeLang}`}</Text>
            {commentTotalSplitForBr[0]}
            {`\n`}
            {`\n`}
            {commentTotalSplitForBr[1]}{' '}
            <Text style={[styles.bluetitle]}>{scoreGradeLang}</Text>{' '}
            {commentTotalsplitAll[3]}
          </Text>
        </View>
        {!moreRead && (
          <TouchableOpacity
            style={[styles.moreReadWrapper]}
            onPress={moreReadClick}
          >
            <Text style={[styles.moreReadText]}>{globalText.more[lang]}</Text>
            <Image
              source={require('../assets/images/result/overAll/down.png')}
            />
          </TouchableOpacity>
        )}
        {moreRead && (
          <>
            <View style={[styles.textWrapper]}>
              <Text style={[styles.subFont, styles.subcolor]}>
                {displayComment}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.moreReadWrapper]}
              onPress={foldClick}
            >
              <Text style={[styles.moreReadText]}>{globalText.fold[lang]}</Text>
              <Image
                source={require('../assets/images/result/overAll/up.png')}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={[styles.whiteBox]}>
        <View style={[styles.textWrapper]}>
          <Text style={[styles.blacktitle, styles.subFont]}>
            {domainCommentSplit[0]}
            <Text style={[styles.bluetitle]}>{top2AchievementMap}</Text>
            {domainCommentSplit[1]}
          </Text>
        </View>
        <View>{domainTopAcievementMap}</View>
      </View>
      <View style={[styles.whiteBox]}>
        <Text style={[styles.blacktitle, styles.subFont]}>
          {competenceCommentSplit[0]}
          {competenceTop2AchievementMap}
          {competenceCommentSplit[1]}
        </Text>
        <View>{competenceTopAcievementMap}</View>
      </View>
      <View style={[styles.whiteBox]}>
        <View style={[styles.textWrapper]}>
          <Text style={[styles.strengthsFont, styles.blacktitle]}>
            {detailStrengthTitle}
          </Text>
        </View>
        <View>{detailedStrengthListMap}</View>
      </View>
    </View>
  )
}

export default MobileOverallEvaluation
