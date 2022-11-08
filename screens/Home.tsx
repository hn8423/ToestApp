import React, {useMemo, useState} from 'react'
import {View, Text, ScrollView, Dimensions, Image} from 'react-native'
import {MainStackParams, SC} from '../type'
import Header from '../component/Header'
import ImageSlider from '../component/ImageSlider'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
import useGetStyle from '../hooks/use-style'
const chartWidth = Dimensions.get('window').width
type GlobalTextProps = {
  en: {
    gpst: string
    smc: string
    etest: string
    title: string
    bigData: string
    userFriendly: string
    testAsDes: string
  }
  ko: {
    gpst: string
    smc: string
    etest: string
    title: string
    text: string
    bigData: string
    userFriendly: string
    testAsDes: string
  }
}

const Home: SC<MainStackParams, 'HomeStack'> = ({navigation}) => {
  const lang = useRecoilValue(langState)

  const [globalText] = useState<any>({
    en: {
      gpst: `Global Problem-Solving Test(GPST) is a \ncompetition that measures comprehensive \nproblem-solving ability based on the \nPISA test.`,
      smc: `Silicon Valley Math Contest (SMC) is\n a competition that measures ability \nfor AI convergence talents. `,
      etest:
        'e~Test Professionals is a nationally \nrecognized certification providing \na comprehensive evaluation system \nthat assesses Information literacy',
      // psycho:
      //   'Psychoeducational evaluations is an assessment \nusing a variety of tools to develop a complete perspective \nof your child’s academic skills and cognitive abilities',
      title: 'TEST AS A SERVICE',
      bigData: `Driving change for testtakers \nthrough big data`,
      userFriendly:
        'User-friendly and accessible, TOEST contains an advanced system to evaluate all learners worldwide.',
      testAsDes:
        'Whether you are a parent or an instructor TOEST provides detailed evaluation and actionable feedback. Our asessment do not happen without you.',
    },
    ko: {
      gpst: `글로벌 문제해결력 시험(GPST)는 \nPISA 평가를 기반으로 하여 \n종합적인 문제 해결 능력을 측정하는 테스트입니다.`,
      smc: `실리콘밸리 수학 시험(SMC)은 \n수학 교과 역량뿐 아니라 \n AI 융합 소양을 포괄적으로 \n평가하는 융합 수학 테스트입니다. `,
      etest:
        'e~Test Professionals는 \n개인의 컴퓨터 활용 능력을 \n검증하는 공인 민간자격시험으로 \n삼성, POSCO, 국방부, 농협 등 \n다양한 기업에서 인정하고 있습니다.',
      // psycho: '인간과 관련된 감각, 지각, 사고, 성격, 기능, 적성의 영역에 대한 종합 검사와 단독 검사로 \n응시자의 정서와 학습 행동의 발달, 성장에 대한 분석을 제공합니다.',
      title: 'TEST AS A SERVICE',
      text: 'TOEST는 학부모와 선생님이 함께 상세한 평가와 \n 실행 가능한 피드백을 제공합니다.\n우리의 평가는 부모님과 함께 피드백을 제공 합니다.',
      bigData: `빅데이터를 기반으로 한 개인 맞춤형 분석`,
      userFriendly: `전 세계 학습자들이 어디서든지 효율적으로\n테스트에 응시할 수 있습니다.\n빅데이터를 활용한 결과 분석과 성장 변화 추이 또한\n확인할 수 있습니다.`,
      testAsDes: '당신의 미래를 대비하기 위한 테스트를 제공합니다.',
    },
  })

  const textLan = useMemo(() => {
    return globalText[lang]
  }, [globalText, lang])

  const images = useMemo(
    () => [
      {
        location: require('../assets/images/home/gpst.png'),
        textContents: {
          subtitle: 'GPST',
          title: 'Global Problem\nSolving Test',
          description: textLan.gpst,
          // theme_dark: true,
        },
      },
      {
        location: require('../assets/images/home/smc.png'),
        textContents: {
          subtitle: 'SMC',
          title: 'Silicon valley\nMath Contes',
          description: textLan.smc,
          // theme_dark: true,
        },
      },
      {
        location: require('../assets/images/home/etest.png'),
        textContents: {
          subtitle: 'Customized MOS Expertise',
          title: 'e~Test\nProfessionals',
          description: textLan.etest,
          // theme_dark: true,
        },
      },
      {
        location: require('../assets/images/home/4.png'),
        textContents: {
          subtitle: '',
          title: '',
          description: '',
        },
      },
    ],
    [textLan],
  )

  // memo
  // memo
  // memo

  const imageList = useMemo(() => {
    return images.map((v, i) => {
      return {...v, key: `imageSlider-${i}`}
    })
  }, [images])

  const style = useGetStyle({
    center: {
      justifyContent: 'flex-start',
      textAlign: 'center',
      height: 1230,
    },
    boxWrapper: {
      position: 'relative',
      width: chartWidth,
    },
    box1: {
      position: 'absolute',
      top: -50,
      left: 16,
      width: chartWidth - 32,
      backgroundColor: '#fff',
      borderRadius: 16,
    },
    box2: {
      position: 'absolute',
      top: 310,
      left: 16,
      width: chartWidth - 32,
      backgroundColor: '#fff',
      borderRadius: 16,
    },
    boxTitleWrapper: {
      marginHorizontal: 24,
      marginVertical: 16,
    },
    boxTitle: {
      fontStyle: 'normal',
      fontWeight: '500',
      color: '#191919',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
      textTransform: 'capitalize',
    },
    boxSub: {
      fontStyle: 'normal',
      fontWeight: '400',
      color: '#393939',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
    },
    boxImage: {
      width: chartWidth - 32,
      resizeMode: 'contain',
    },
  })

  return (
    <>
      <Header />
      <ScrollView>
        <View {...style.center}>
          <ImageSlider images={imageList} />
          <View {...style.boxWrapper}>
            <View {...style.box1}>
              <View {...style.boxTitleWrapper}>
                <Text {...style.boxTitle}>TEST AS A SERVICE</Text>
              </View>
              <Image
                {...style.boxImage}
                source={require('../assets/images/home/box1.png')}
              />
              <View {...style.boxTitleWrapper}>
                <Text {...style.boxTitle}>{textLan.testAsDes}</Text>
              </View>
            </View>
            <View {...style.box2}>
              <View {...style.boxTitleWrapper}>
                <Text {...style.boxTitle}>{textLan.bigData}</Text>
              </View>
              <Image
                {...style.boxImage}
                source={require('../assets/images/home/box1.png')}
              />
              <View {...style.boxTitleWrapper}>
                <Text {...style.boxTitle}>{textLan.userFriendly}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default Home
