import {useMemo} from 'react'
import {Text, View, Dimensions} from 'react-native'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
import useGetStyle from '../hooks/use-style'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
const chartWidth = Dimensions.get('window').width

type Props = {
  data: {
    resultInfo: any
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
  let myScore = useMemo(
    () => (data.resultInfo ? `${data.resultInfo.scoreMap.score.score}` : '0'),
    [data],
  )

  // console.log(data.testName)
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
  })

  return (
    <View {...style.wrapper}>
      <View {...style.whiteBox}>
        <Text {...style.resultTitle}>{resultTitle}</Text>
        <View {...style.line} />
        <View {...style.myanswerInfo}>
          <Text>{doneTime}</Text>
          <Text>LEVEL {data.level}</Text>
        </View>
        <View {...style.myAnswerGraphScore}>
          <Text {...style.resultTitle}>SCORE</Text>
          <Text {...style.myScore}>{myScore} </Text>
          <Text {...style.resultTitle}>/ 100</Text>
        </View>
      </View>
      <View {...style.whiteBox}>
        <View {...style.awardWrapper}>
          <Text {...style.resultTitle}>Award</Text>
        </View>
      </View>
    </View>
  )
}

export default MobileMyAnswer
