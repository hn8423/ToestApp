import {useMemo, useRef, useState} from 'react'
import {Image, Text, View, Dimensions} from 'react-native'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
import useGetStyle from '../hooks/use-style'
import Button from './Button'
import Video from 'react-native-video'
import dayjs from 'dayjs'
const chartWidth = Dimensions.get('window').width

type Props = {
  data: {
    setSelect: (value: React.SetStateAction<number>) => void
    select: number
    testName: string
    times: number
    level: string
  }
}
const ViewVideo = ({
  data: {setSelect, select, testName, times, level},
}: Props) => {
  const lang = useRecoilValue(langState) as 'en' | 'ko'
  let [video, setVideo] = useState(false)
  let videoRef = useRef(null)
  const globalText = {
    back: {en: 'BACK TO MY ANSWER', ko: '돌아가기'},
    video: {en: 'VIEW VIDEO', ko: '해설 영상 보기'},
    question: {en: 'BACK TO MY QUESTION', ko: '문제 보기'},
    title: {
      en: `${testName} ${times}st Question No.${select}`,
      ko: `${testName} ${times}회차 ${select}번째 문제`,
    },
  }
  function videoOnClick() {
    setVideo(true)
  }

  function questionOnClick() {
    setVideo(false)
  }
  function myAnswerOnClick() {
    setSelect(0)
  }

  //memo
  //memo
  //memo

  let number = useMemo(() => {
    let str = ''
    if (select < 10) {
      str = '0' + select.toString()
      return str
    } else {
      return select
    }
  }, [select])

  let videoLang = useMemo(() => {
    if (lang === 'en') {
      return 'e'
    } else {
      return 'k'
    }
  }, [lang])

  //STYLE
  //STYLE
  //STYLE
  const style = useGetStyle({
    wrapper: {
      paddingVertical: 16,
    },
    whiteBox: {
      backgroundColor: '#fff',
      padding: 24,
      margin: 16,
      borderRadius: 8,
    },
    viewTitle: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
      color: '#191919',
      marginBottom: 24,
    },
    image: {
      resizeMode: 'contain',
      width: chartWidth - 84,
      height: 700,
    },
    btnBack: {
      paddingTop: 32,
    },
    videoWrapper: {
      width: chartWidth,
      height: chartWidth * 0.6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    videoText: {
      marginHorizontal: 16,
      paddingVertical: 8,
      borderBottomColor: '#DBDBDB',
      borderBottomWidth: 2,
    },
    videoTextTitle: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 24,
      letterSpacing: -0.04,
      color: '#191919',
    },
    videoTextDate: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: -0.04,
      color: '#767676',
    },
    btnWrapper: {
      marginHorizontal: 16,
      marginTop: 60,
    },
  })
  return (
    <View {...style.wrapper}>
      {!video && (
        <View {...style.whiteBox}>
          <Text {...style.viewTitle}>Question No. {select}</Text>
          <Image
            {...style.image}
            source={{
              uri: `https://dev.toest.me/images/result/myAnswer/testImages/${testName.toLowerCase()}/${times}/${level.toLowerCase()}/${lang}/q${select}-1.png`,
            }}
          />
          <Image
            {...style.image}
            source={{
              uri: `https://dev.toest.me/images/result/myAnswer/testImages/${testName.toLowerCase()}/${times}/${level.toLowerCase()}/${lang}/q${select}-2.png`,
              // width: chartWidth,
              // height: 500,
            }}
          />
          <Button
            color={'#999999'}
            backgroundColor={'#dbdbdb'}
            onPress={myAnswerOnClick}
          >
            {globalText.back[lang]}
          </Button>
          <View {...style.btnBack}>
            <Button
              color={'#fff'}
              backgroundColor={'#4AC1E8'}
              onPress={videoOnClick}
            >
              {globalText.video[lang]}
            </Button>
          </View>
        </View>
      )}
      {video && (
        <>
          <View {...style.videoWrapper}>
            <Video
              {...style.video}
              source={{
                uri: `https://dev-toest-s3.s3.ap-northeast-2.amazonaws.com/video/${testName.toLowerCase()}/${times}/${level.toLowerCase()}/${lang}/${number}(${videoLang}).mp4`,
              }}
              resizeMode={'contain'}
              paused={true}
              controls={true}
            />
          </View>
          <View {...style.videoText}>
            <Text {...style.videoTextTitle}>{globalText.title[lang]}</Text>
            <Text {...style.videoTextDate}>{`${dayjs().format(
              'YYYY.MM.DD',
            )}`}</Text>
          </View>
          <View {...style.btnWrapper}>
            <Button
              color={'#fff'}
              // backgroundColor={'#dbdbdb'}
              backgroundColor={'#4AC1E8'}
              onPress={questionOnClick}
            >
              {globalText.question[lang]}
            </Button>
            <View {...style.btnBack}>
              <Button
                color={'#4AC1E8'}
                backgroundColor={'#fff'}
                onPress={myAnswerOnClick}
              >
                {globalText.back[lang]}
              </Button>
            </View>
          </View>
        </>
      )}
    </View>
  )
}

export default ViewVideo
