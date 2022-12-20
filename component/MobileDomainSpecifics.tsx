import {useMemo, useState} from 'react'
import {Text, View, Dimensions, Image} from 'react-native'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
import useStyles2 from '../hooks/ use-style2'
import {LangMap2} from '../type'
import {Result} from '../type/result'
import _ from 'lodash'
const chartWidth = Dimensions.get('window').width

type Props = {
  data: {
    resultInfo?: Result.DetailDataType['resultInfo']
    resultComment: Result.DetailDataType['resultComment']
    userName: string
  }
}
const MobileDomainSpecifics = ({
  data: {resultInfo, resultComment, userName},
}: Props) => {
  // data
  // data
  // data
  const lang = useRecoilValue(langState) as 'en' | 'ko'
  const [globalText] = useState<LangMap2>({
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
    joinText: {en: ' and ', ko: ', '},
  })
  const globalText2 = {
    en: {domainBlue: 'Domain', specific: 'Specifics'},
    ko: {domainBlue: '', specific: '지식영역'},
  }

  const textLang = useMemo(() => {
    if (lang === 'ko') {
      return 'text_ko'
    } else if (lang === 'en') {
      return 'text_en'
    }
    return 'text_en'
  }, [lang])

  const getGlobalText = useMemo(() => {
    return (key: string) => globalText[key][lang]
  }, [globalText, lang])

  const dataList = useMemo(() => {
    return [
      {
        name: globalText.artHumanTitle[lang],
        score: resultInfo!.scoreMap.dom_artHumanScore,
        img: require('../assets/images/result/domain/artHumanBadge.png'),
      },
      {
        name: globalText.healthGlobalEnvironmentTitle[lang],
        score: resultInfo!.scoreMap.dom_healthGlobalScore,
        img: require('../assets/images/result/domain/healthGlobalEnvironmentBadge.png'),
      },
      {
        name: globalText.socialScienceTitle[lang],
        score: resultInfo!.scoreMap.dom_socialScienceScore,
        img: require('../assets/images/result/domain/socialScienceBadge.png'),
      },
      {
        name: globalText.physicalScienceTitle[lang],
        score: resultInfo!.scoreMap.dom_technologyScore,
        img: require('../assets/images/result/domain/physicalScienceBadge.png'),
      },
    ]
  }, [globalText, lang, resultInfo])

  const domainData = useMemo(
    () => [
      {
        title: globalText.artHumanTitle[lang],
        description:
          resultComment.domainSpecific.description.dom_artHuman.none[textLang],
        tags: resultComment.domainSpecific.tag.dom_artHuman.none[
          textLang
        ].split(', '),
        img: require('../assets/images/result/domain/artHumanContentsImg.png'),
      },
      {
        title: globalText.socialScienceTitle[lang],
        description:
          resultComment.domainSpecific.description.dom_socialScience.none[
            textLang
          ],
        tags: resultComment.domainSpecific.tag.dom_socialScience.none[
          textLang
        ].split(', '),
        img: require('../assets/images/result/domain/healthGlobalEnvironmentContentsImg.png'),
      },
      {
        title: globalText.physicalScienceTitle[lang],
        description:
          resultComment.domainSpecific.description.dom_technology.none[
            textLang
          ],
        tags: resultComment.domainSpecific.tag.dom_technology.none[
          textLang
        ].split(', '),
        img: require('../assets/images/result/domain/socialScienceContentsImg.png'),
      },
      {
        title: globalText.healthGlobalEnvironmentTitle[lang],
        description:
          resultComment.domainSpecific.description.dom_healthGlobal.none[
            textLang
          ],
        tags: resultComment.domainSpecific.tag.dom_healthGlobal.none[
          textLang
        ].split(', '),
        img: require('../assets/images/result/domain/physicalScienceContentsImg.png'),
      },
    ],
    [globalText, lang, resultComment, textLang],
  )

  function tagsClass(idx: number) {
    const confirm = [
      '#e0f5fb',
      '#ffa94580',
      '#ffe26d99',
      '#c8e98fb2',
      '#e666a966',
    ] // tag index
    return confirm[idx]
  }

  //memo
  //memo
  //memo

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
  const obtainBadge = useMemo(
    () =>
      resultComment
        ? resultComment.domainSpecific.description.badge.none[textLang]
        : '',
    [resultComment, textLang],
  )

  const obtainBadgeSplitByBadgeList = useMemo(() => {
    return obtainBadge.split('|_badgeList_|')
  }, [obtainBadge])

  const myName = useMemo(
    () => (lang === 'ko' ? userName : 'You'),
    [lang, userName],
  )
  const obtainBadgeStart = useMemo(() => {
    if (lang === 'ko') {
      return obtainBadgeSplitByBadgeList[0].replace('|_name_|', '')
    } else if (lang === 'en') {
      return obtainBadgeSplitByBadgeList[0].slice(3)
    }
  }, [lang, obtainBadgeSplitByBadgeList])
  const obtainBadgeStrong = useMemo(() => {
    return displayDataList.map(v => v.name).join(getGlobalText('joinText'))
  }, [displayDataList, getGlobalText])
  const obtainBadgeEnd = useMemo(
    () => obtainBadgeSplitByBadgeList[1],
    [obtainBadgeSplitByBadgeList],
  )

  const userDescription = useMemo(
    () =>
      resultComment
        ? resultComment.domainSpecific.comment.badge.none[textLang]
        : '',
    [resultComment, textLang],
  )
  const userDescriptionSplitByBadgeList = useMemo(() => {
    return userDescription.split('|_badgeList_|')
  }, [userDescription])
  const userDescriptionStart = useMemo(() => {
    if (lang === 'ko') {
      return userDescriptionSplitByBadgeList[0].replace('|_name_|', '')
    } else if (lang === 'en') {
      return userDescriptionSplitByBadgeList[0].slice(3)
    }
  }, [lang, userDescriptionSplitByBadgeList])

  const userDescriptionStrong = useMemo(() => {
    return displayDataList.map(v => v.name).join(getGlobalText('joinText'))
  }, [displayDataList, getGlobalText])

  const userDescriptionEnd = useMemo(() => {
    if (lang === 'ko') {
      return userDescriptionSplitByBadgeList[1].replace('|_name_|', 'name')
    } else if (lang === 'en') {
      return userDescriptionSplitByBadgeList[1].slice(5)
    }
  }, [lang, userDescriptionSplitByBadgeList])

  /**@type {string} */
  const zeroScoreText = useMemo(() => {
    return !displayDataList.length
      ? resultComment.domainSpecific.comment.notEnough.none[textLang]
      : ''
  }, [displayDataList.length, resultComment, textLang])

  const {styles} = useStyles2({
    wrapper: {padding: 16, flex: 1},
    whiteBox: {
      marginVertical: 16,
      padding: 24,
      backgroundColor: '#fff',
      borderRadius: 8,
    },
    titleWrapper: {
      flexDirection: 'row',
    },
    title: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
    },
    blue: {
      color: '#4AC1E8',
    },
    black: {
      color: '#191919',
    },
    topSub: {
      flexDirection: 'row',
      width: chartWidth - 80,
    },
    badgeWrapper: {
      marginVertical: 8,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    sub: {
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
    },
    cardImage: {
      width: chartWidth - 80,
    },
    tagWrapper: {
      marginTop: 22,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    tag: {
      height: 28,
      borderRadius: 50,
      paddingHorizontal: 8,
      paddingVertical: 6,
      margin: 6,
    },
  })
  // //render map
  // //render map
  // //render map

  const contentBoxTitleAndDescription = useMemo(() => {
    return domainData.map((v, i) => {
      let isExistTags = !!(v.tags && v.tags.length)
      return (
        <View key={v.title} style={[styles.whiteBox]}>
          <Text style={[styles.cardTitle]}>{v.title}</Text>
          <Image style={[styles.cardImage]} source={v.img} />

          <Text style={[styles.sub]}>{v.description}</Text>
          <View style={[styles.tagWrapper]}>
            {isExistTags &&
              v.tags.map(tag => (
                <View
                  key={`${tag}-${i}`}
                  style={[styles.tag, {backgroundColor: tagsClass(i)}]}
                >
                  <Text style={[styles.sub]}>{tag}</Text>
                </View>
              ))}
          </View>
        </View>
      )
    })
  }, [domainData, styles])

  const badgeMap = useMemo(() => {
    return displayDataList.map((v, i) => [
      <Image key={`badgeMap-${v.name}-${i}`} source={v.img} />,
    ])
  }, [displayDataList])
  return (
    <View style={styles.wrapper}>
      <View style={styles.whiteBox}>
        <View style={styles.titleWrapper}>
          <Text style={[styles.title, styles.blue]}>
            {globalText2[lang].domainBlue}
          </Text>
          <Text style={[styles.title, styles.black]}>
            {' '}
            {globalText2[lang].specific}
          </Text>
        </View>
        {!!zeroScoreText && <Text>{zeroScoreText}</Text>}
        {!zeroScoreText && (
          <View>
            <View style={[styles.topSub]}>
              <Text style={[styles.sub]}>
                {myName}
                {obtainBadgeStart}
                {obtainBadgeStrong}
                {obtainBadgeEnd}
              </Text>
            </View>
            <View style={[styles.badgeWrapper]}>{badgeMap}</View>
            <Text style={[styles.sub]}>
              {myName}
              {userDescriptionStart}
              {userDescriptionStrong}
              {userDescriptionEnd}
            </Text>
          </View>
        )}
      </View>
      {contentBoxTitleAndDescription}
    </View>
  )
}

export default MobileDomainSpecifics
