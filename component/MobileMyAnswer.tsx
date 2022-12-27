import {useMemo, useState, useEffect} from 'react'
import {Text, View, Image} from 'react-native'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
import useGetStyle from '../hooks/use-style'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import countryData from '../utills/countryCode'
import _ from 'lodash'
import {LangMap2} from '../type'
import {Result} from '../type/result'
import Button from '../component/Button'
import ViewVideo from './ViewVideo'
import MyAnswerGraph from './myAnswerGraph'
dayjs.extend(utc)

type Props = {
  data: {
    resultInfo?: Result.DetailDataType['resultInfo']
    testName: string
    times: number
    level: string
    activeTrophy: number
  }
}
type TitleMapType = {
  [x: string]: string
}

const MobileMyAnswer = ({data}: Props) => {
  //DATA
  //DATA
  //DATA
  const lang = useRecoilValue(langState) as 'en' | 'ko'
  const [activeTrophy, setActiveTrophy] = useState(0)
  let [select, setSelect] = useState(0)
  const globalText: LangMap2 = useMemo(() => {
    return {
      en: {
        myBlue: 'My',
        answer: 'Answer',
        view: 'View',
        world: 'World',
      },
      ko: {
        myBlue: '',
        answer: '내 점수',
        view: '문항 보기',
        world: '전체',
      },
    }
  }, [])
  //MEMO
  //MEMO
  //MEMO
  const resultTitle = useMemo(() => {
    const titleMap: TitleMapType = {
      GPST: `Global Problem Solving Test `,
      smc: `smc`,
      etest: `etest`,
      spyco: `spyco`,
    }
    return titleMap[data.testName]
  }, [data])

  const worldScore = useMemo(
    () => (data.resultInfo ? data.resultInfo?.scoreMap.score.world.average : 0),
    [data],
  )
  const countryScore = useMemo(
    () =>
      data.resultInfo ? data.resultInfo?.scoreMap.score.country.average : 0,
    [data],
  )
  const myScoreReal = useMemo(
    () => (data.resultInfo ? data.resultInfo.scoreMap.score.score : 0),
    [data],
  )
  let worldWide = useMemo(() => {
    let percent = data.resultInfo?.scoreMap.score.world.topPercentage
    if (percent === 100) {
      return '100'
    }

    let displayNumber = _(percent).floor(1)
    let isInteger = Number.isInteger(displayNumber)
    let numberAmount = _(percent).floor().toString().length === 1
    let word = _(
      isInteger ? `${displayNumber}.` : `${_(displayNumber).floor(1)}`,
    ).padEnd(numberAmount ? 3 : 4, '0')
    return word
  }, [data])

  const doneTime = useMemo(() => {
    if (!data.resultInfo) {
      return ''
    }
    if (lang === 'en') {
      return `${dayjs(data.resultInfo!.doneTimeStamp)
        .utc()
        .format('YYYY.MM.DD H:mm z')}`
    } else {
      return `${dayjs(data.resultInfo!.doneTimeStamp)
        .utcOffset('+0900')
        .format('YYYY.MM.DD H:mm')} KST`
    }
  }, [lang, data])
  const myScore = useMemo(
    () => (data.resultInfo ? `${data.resultInfo.scoreMap.score.score}` : '0'),
    [data],
  )
  const scores = useMemo(() => {
    if (!data.resultInfo) {
      return 0
    }
    return data.resultInfo.scoreMap.score.score
  }, [data])
  const worldPercentage = useMemo(() => {
    if (!data.resultInfo) {
      return 0
    }
    return data.resultInfo.scoreMap.score.world.topPercentage
  }, [data])
  const country = useMemo(() => {
    if (!data.resultInfo) {
      return 'KO'
    }
    if (lang === 'ko') {
      return `${
        countryData.countryCodeMap[data!.resultInfo!.countryCode].code_ko
      }`
    } else if (lang === 'en') {
      return `${
        countryData.countryCodeMap[data!.resultInfo!.countryCode].code_en
      }`
    }
  }, [lang, data])

  const [obj] = useState<{[x: number]: string | JSX.Element}>({
    0: '',
    1: (
      <Image
        source={require('../assets/images/result/myAnswer/participation.png')}
      />
    ),
    2: (
      <Image source={require('../assets/images/result/myAnswer/bronze.png')} />
    ),
    3: (
      <Image source={require('../assets/images/result/myAnswer/silver.png')} />
    ),
    4: <Image source={require('../assets/images/result/myAnswer/gold.png')} />,
    5: (
      <Image
        source={require('../assets/images/result/myAnswer/platinum.png')}
      />
    ),
    6: (
      <Image source={require('../assets/images/result/myAnswer/perfect.png')} />
    ),
  })

  const activeObj = useMemo(() => obj[activeTrophy], [activeTrophy, obj])
  //onPress
  //onPress
  //onPress
  function viewClick(stage: number) {
    return () => {
      setSelect(stage)
    }
  }
  //USEEFFECT
  //USEEFFECT
  //USEEFFECT
  useEffect(() => {
    if (!scores) {
      return
    }
    if (scores === 100) {
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
  }, [scores, worldPercentage])
  //STYLE
  //STYLE
  //STYLE
  const style = useGetStyle({
    wrapper: {
      paddingVertical: 32,
    },
    whiteBox: {
      marginHorizontal: 16,
      marginVertical: 8,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 24,
    },
    resultTitle: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
      color: '#191919',
      marginBottom: 8,
    },
    myScore: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
      color: '#4AC1E8',
      marginLeft: 50,
    },
    line: {
      height: 2,
      width: '100%',
      backgroundColor: '#F1F1F5',
    },
    myanswerInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    myAnswerGraphScore: {
      marginTop: 32,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    awardWrapper: {
      alignItems: 'center',
    },
    textTitle: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: 24,
    },
    titleBlue: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
      color: '#4AC1E8',
    },
    titleBlack: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
      color: '#191919',
    },
    listWrapper: {
      flexDirection: 'row',
      borderBottomColor: '#F1F1F5',
      borderBottomWidth: 2,
    },
    listPart: {
      width: '20%',
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },

    listTitle: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4,
      color: '#191919',
    },
    scoreWrapper: {
      flexDirection: 'row',
      borderBottomColor: '#F1F1F5',
      borderBottomWidth: 2,
    },
    caption: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      // backgroundColor: 'red',
    },
    captionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: 100,
    },
    captionDotMy: {
      width: 12,
      height: 12,
      backgroundColor: '#0086c3',
      borderRadius: 50,
      marginRight: 8,
    },
    captionDotCountry: {
      width: 12,
      height: 12,
      backgroundColor: '#1ab3e5',
      borderRadius: 50,
      marginRight: 8,
    },
    captionDotOverall: {
      width: 12,
      height: 12,
      backgroundColor: '#7dd2ee',
      borderRadius: 50,
      marginRight: 8,
    },
  })

  //render
  //render
  //render
  const score = useMemo(() => {
    return data.resultInfo?.myAnswerInfo.map((v, i) => (
      <View {...style.scoreWrapper} key={`score-${v.stage}-${i}`}>
        <View {...style.listPart}>
          <Text>{`${v.stage}`}</Text>
        </View>
        <View {...style.listPart}>
          <Image
            source={
              v.isCorrectedByMyAnswer
                ? require('../assets/images/result/myAnswer/o.png')
                : require('../assets/images/result/myAnswer/x.png')
            }
          />
        </View>
        <View {...style.listPart}>
          <Button onPress={viewClick(v.stage)} height={36}>
            {globalText[lang].view}
          </Button>
        </View>
        <View {...style.listPart}>
          <Text>{`${_(v.worldCorrectAnswerRate).floor(1)}%`}</Text>
        </View>
        <View {...style.listPart}>
          <Text>{`${_(v.countryCorrectAnswerRate).floor(1)}%`}</Text>
        </View>
      </View>
    ))
  }, [data, globalText, lang, style])

  return (
    <>
      {select === 0 && data && (
        <View {...style.wrapper}>
          <View {...style.whiteBox}>
            <Text {...style.resultTitle}>{resultTitle}</Text>
            <View {...style.line} />
            <View {...style.myanswerInfo}>
              <Text>{doneTime}</Text>
              <Text>LEVEL {data.level}</Text>
            </View>
            <MyAnswerGraph
              data={{worldScore, countryScore, myScoreReal, worldWide}}
            />
            <View {...style.caption}>
              <View {...style.captionItem}>
                <View {...style.captionDotMy} />
                <Text>MY</Text>
              </View>
              <View {...style.captionItem}>
                <View {...style.captionDotCountry} />
                <Text numberOfLines={1} ellipsizeMode="tail">
                  {/* {country} */}
                </Text>
              </View>
              <View {...style.captionItem}>
                <View {...style.captionDotOverall} />
                <Text>OVERALL</Text>
              </View>
            </View>
            <View {...style.myAnswerGraphScore}>
              <Text {...style.resultTitle}>SCORE</Text>
              {/* <Text {...style.myScore}>{myScore} </Text> */}
              <Text {...style.resultTitle}>/ 100</Text>
            </View>
          </View>
          <View {...style.whiteBox}>
            <View {...style.awardWrapper}>
              <Text {...style.resultTitle}>Award</Text>
              {/* <View>{activeObj}</View> */}
            </View>
          </View>
          <View {...style.whiteBox}>
            <View {...style.textTitle}>
              <Text {...style.titleBlue}>{globalText[lang].myBlue} </Text>
              <Text {...style.titleBlack}>{globalText[lang].answer}</Text>
            </View>
            <View {...style.line} />
            <View {...style.listWrapper}>
              <View {...style.listPart}>
                <Text {...style.listTitle}>No.</Text>
              </View>
              <View {...style.listPart}>
                <Text {...style.listTitle}>{globalText[lang].answer}</Text>
              </View>
              <View {...style.listPart}>
                <Text {...style.listTitle}>{globalText[lang].view}</Text>
              </View>
              <View {...style.listPart}>
                <Text {...style.listTitle}>{globalText[lang].world}</Text>
              </View>
              <View {...style.listPart}>
                {/* <Text {...style.listTitle}>{country}</Text> */}
              </View>
            </View>
            {/* <View>{score}</View> */}
          </View>
        </View>
      )}
      {/* {select !== 0 && (
        <ViewVideo
          data={{
            setSelect,
            select,
            testName: data.testName,
            times: data.times,
            level: data.level,
          }}
        />
      )} */}
    </>
  )
}

export default MobileMyAnswer
