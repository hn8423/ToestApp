import React, {useState, useMemo} from 'react'
import {View, ScrollView, Image, Dimensions, Text} from 'react-native'
import {NavigationProps, LangMap1} from '../type'
import Header from '../component/Header'
import useGetStyle from '../hooks/use-style'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
const chartWidth = Dimensions.get('window').width

const ToestIntro = ({navigation}: NavigationProps) => {
  const lang = useRecoilValue(langState) as 'en' | 'ko'
  const [globalText] = useState<LangMap1>({
    en: {
      mainDes:
        'A global test platfrom to evaluate\n future competencies and aptitude\n of learners worldwide.',
      contentsBox1Title: 'What is TOEST?',
      contentsBox1Des: `TOEST aims to inspire intellectual curiosity in every young mind and has a central theme each period.\n
       In TOEST, learners can participate in several testings such as GPST (Global Problem Solving Test), SMC (Silicon Valley Math Contest), etc. All are held online with any gadget. \n
      In TOEST testings, young intellectuals share their creative solutions, develop their \nmulti-disciplinary future competencies, unlock their potentials, and make friends through Stanford smileUP Q&A Platform.`,
      contentsBox2Li:
        'Global online test in contactless world \nFuture-oriented competency test \nPersonalized analysis and feedback \nViewerse post-activities \nOfficial certification',
      contentsBox3Title: 'Global Online Tests in contacless World',
      contentsBox3Li:
        'Gadget friendly supporting mobile, tablet and PC \nMultilingual',
      contentsBox4Title: 'Future-Oriented Competency Test',
      contentsBox4Li:
        'Information and media literacy, critical thinking, computational thinking, AI convergence skills, creative thinking, etc',
      contentsBox5Title: 'Peronalized Analysis And Feedback',
      contentsBox5Li: 'Detailed report \nLong-term growth recommendation',
      contentsBox6Title: 'Viewerse Post-Activities',
      contentsBox6Li:
        'Silicon valley mentorship \nPre-recorded explanation for each question \nDiscussion with other participants around the world',
      contentsBox7Title: 'Official Certification',
      contentsBox7Li:
        'Stanford SMILE Official Certificate for all GPST, SMC participants \ne~Test Certification',
      contentsBox8Title: 'Global Problem Solving Test (GPST)',
      contentsBox8Des:
        'An international assessment of comprehensive problem solving ability, comprised of convergence questions that students commonly encounter in real life.',
      contentsBox9Title: 'Silicon valley Mathematics Contest (SMC)',
      contentsBox9Des:
        'A test that measures ability for AI convergence talents such as computational thinking, digital literacy, and AI literacy.',
      contentsBox10Title: 'e~Test',
      contentsBox10Des:
        'A comprehensive evaluation for Information and computer literacy certified by Government.',
      // contentsBox11Title: 'Psychoeducational Evaluations',
      // contentsBox11Des: `Comprehensive psychoeducational examinations to assess child's development, and growth in learning and follow-up education contents with medical, psychological and pedagogical orientation.`,
    },
    ko: {
      mainDes: ` 전 세계 학습자의 미래 역량과 
적성을 평가하는 
글로벌 테스트 플랫폼`,
      contentsBox1Title: 'What is TOEST?',
      contentsBox1Des: `TOEST의 미션은 미래 세대가 살아갈 때 필요한 역량과 적성을 개발할 수 있도록 돕는 것입니다. \n
TOEST에서 학습자는 온라인으로 진행되는 글로벌 문제해결력 시험(GPST), 실리콘밸리 수학 시험(SMC), e~Test(컴퓨터 활용능력 검정) 등과 같은 다양한 테스트에 참여할 수 있습니다.\n
TOEST 내의 테스트를 통해 미래역량과 잠재력을 개발하고, 사후활동이 이루어지는 Stanford smileUP에서 글로벌 친구들과 함께 창의적인 솔루션을 공유할 수 있습니다.`,
      contentsBox2Li:
        '비대면 시대의 글로벌 온라인 테스트 \n미래 역량 진단 테스트  \n개인 맞춤형 분석과 행 계획을 제안하는 피드백\n다양한 사후활동  \n공식 인증서 발급 ',
      contentsBox3Title: '비대면시대의 글로벌 온라인 테스트',
      contentsBox3Li:
        '모바일, 태블릿, PC와 같은 스마트 기기 지원\n다양한 언어 지원',
      contentsBox4Title: '미래 역량 진단 테스트',
      contentsBox4Li:
        '다양한 영역의 미래 역량 분석 \n응시생이 기존 지식을 어떻게 활용하는지 측정하는 평가도구 설계',
      contentsBox5Title: '개인 맞춤형 분석과 피드백',
      contentsBox5Li:
        '개인의 역량과 적성에 대한 상세한 리포트 제공\n꾸준하고 장기적인 성장을 위한 피드백 제공',
      contentsBox6Title: '다양한 사후활동  ',
      contentsBox6Li:
        '실리콘 밸리 멘토들과의 멘토쉽 \n각 문항에 대한 문제 풀이 영상 \n전 세계 응시생들과의 토론 활동',
      contentsBox7Title: '공식 인증서 발급 ',
      contentsBox7Li:
        '스탠포드 SMILE 공식 인증서 발급 \ne~Test 공인 민간 자격증 발급',
      contentsBox8Title: 'Global Problem Solving Test (GPST)',
      contentsBox8Des:
        '실재 세계 문제상황을 연계한 융합적 문항들로 구성된 글로벌 종합적 문제해결력 테스트입니다.',
      contentsBox9Title: 'Silicon valley Mathematics Contest (SMC)',
      contentsBox9Des:
        '컴퓨팅 사고력, 디지털 리터러시와 AI리터러시를 아우르는 AI융합 역량을 측정하는 글로벌 시험입니다. ',
      contentsBox10Title: 'e~Test',
      contentsBox10Des:
        '정보화능력을 측정하는 종합적인 \n평가도구로 공인민간자격시험입니다.',
      // contentsBox11Title: 'Psychoeducational Evaluations',
      // contentsBox11Des: '심리 정서적 측면과 교육적 측면에서 발달 및 성장을 평가하는 종합 검사 및 단독검사입니다.',
    },
  })
  const [contentsBoxImg] = useState([
    require('../assets/images/intro/intro2.gif'),
    require('../assets/images/intro/intro3.png'),
    require('../assets/images/intro/intro4.png'),
    require('../assets/images/intro/intro5.png'),
    require('../assets/images/intro/intro6.png'),
    require('../assets/images/intro/intro7.png'),
    require('../assets/images/intro/intro8.png'),
    require('../assets/images/intro/intro9.png'),
    require('../assets/images/intro/intro10.png'),
  ])
  const textLan = useMemo(() => {
    return globalText[lang]
  }, [globalText, lang])

  const box2to6Contents = useMemo(
    () => [
      {
        id: 0,
        name: 'Box2',
        title: 'Why TOEST?',
        img: contentsBoxImg[0],
        li: textLan.contentsBox2Li,
      },
      {
        id: 1,
        name: 'Box3',
        title: textLan.contentsBox3Title,
        img: contentsBoxImg[1],
        li: textLan.contentsBox3Li,
      },
      {
        id: 2,
        name: 'Box4',
        title: textLan.contentsBox4Title,
        img: contentsBoxImg[2],
        li: textLan.contentsBox4Li,
      },
      {
        id: 2,
        name: 'Box5',
        title: textLan.contentsBox5Title,
        img: contentsBoxImg[3],
        li: textLan.contentsBox5Li,
      },
      {
        id: 3,
        name: 'Box6',
        title: textLan.contentsBox6Title,
        img: contentsBoxImg[4],
        li: textLan.contentsBox6Li,
      },
      {
        id: 4,
        name: 'Box7',
        title: textLan.contentsBox7Title,
        img: contentsBoxImg[5],
        li: textLan.contentsBox7Li,
      },
    ],
    [textLan, contentsBoxImg],
  )

  const box7to11Contents = useMemo(
    () => [
      {
        name: 'Box8',
        title: textLan.contentsBox8Title,
        img: contentsBoxImg[6],
        des: textLan.contentsBox8Des,
      },
      {
        name: 'Box9',
        title: textLan.contentsBox9Title,
        img: contentsBoxImg[7],
        des: textLan.contentsBox9Des,
      },
      {
        name: 'Box10',
        title: textLan.contentsBox10Title,
        img: contentsBoxImg[8],
        des: textLan.contentsBox10Des,
      },
    ],
    [textLan, contentsBoxImg],
  )
  //render
  //render
  //render
  const liMap = useMemo(() => {
    let boxLiMap = box2to6Contents.map(v => {
      return v.li.split('\n').map((name: string, i: number) => {
        return (
          <View
            key={`contentsBox1-${i}`}
            style={{flexDirection: 'row', paddingRight: 24}}
          >
            <Image source={require('../assets/images/intro/check.png')} />
            <Text
              style={{
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 20,
                letterSpacing: 0.25,
                color: '#393939',
              }}
            >
              {name}
            </Text>
          </View>
        )
      })
    })

    return boxLiMap
  }, [box2to6Contents])

  //style
  //style
  //style
  const style = useGetStyle({
    center: {
      height: 4370,
      alignItems: 'center',
      textAlign: 'center',
    },
    mainImg: {
      width: chartWidth,
      resizeMode: 'cover',
    },
    mainTitle: {
      position: 'absolute',
      top: 96,
      left: 16,
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 28,
      lineHeight: 32,
      letterSpacing: 0.18,
      color: '#4AC1E8',
    },
    mainTitle2: {
      position: 'absolute',
      top: 96,
      left: 32,
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 28,
      lineHeight: 32,
      letterSpacing: 0.18,
      color: '#4AC1E8',
      zIndex: 3,
    },
    mainSub: {
      position: 'absolute',
      top: 144,
      left: 16,
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: '#767676',
    },
    mainSub2: {
      position: 'absolute',
      top: 144,
      left: 32,
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: '#767676',
      zIndex: 3,
    },
    contentWrapper: {
      width: chartWidth - 32,
      borderRadius: 8,
      backgroundColor: '#fff',
      marginTop: 16,
      padding: 24,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    contentsAbsolute: {
      position: 'absolute',
      top: 330,
      alignItems: 'center',
    },
    contentsImg: {
      width: chartWidth - 80,
      height: 180,
      resizeMode: 'contain',
    },
    contentList: {
      flexDirection: 'row',
    },
    contentsTitle: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
      textTransform: 'capitalize',
      color: '#191919',
    },
    contentsSub: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: '#393939',
    },
  })
  return (
    <View>
      <Header />
      <ScrollView nestedScrollEnabled={true}>
        <View {...style.center}>
          <View>
            <Text {...style.mainTitle}>TOEST</Text>
            <Text {...style.mainSub}>{textLan.mainDes}</Text>
            <Image
              {...style.mainImg}
              source={require('../assets/images/intro/main.png')}
            />
          </View>

          <View {...style.contentsAbsolute}>
            <View {...style.contentWrapper}>
              <Text {...style.contentsTitle}>{textLan.contentsBox1Title}</Text>
              <Image source={require('../assets/images/intro/intro1.png')} />
              <Text {...style.contentsSub}>{textLan.contentsBox1Des}</Text>
            </View>
            {box2to6Contents.map((v, i) => {
              return (
                <View {...style.contentWrapper}>
                  <Text {...style.contentsTitle}>{v.title}</Text>
                  <Image {...style.contentsImg} source={v.img} />
                  <View>{liMap[i]}</View>
                </View>
              )
            })}
            <View>
              <Text {...style.mainTitle2}>TEST</Text>
              <Text {...style.mainSub2}>GPST,SMC,e~Test</Text>
              <Image
                {...style.mainImg}
                source={require('../assets/images/intro/main2.png')}
              />
            </View>

            {box7to11Contents.map((v, i) => {
              return (
                <View {...style.contentWrapper}>
                  <Text {...style.contentsTitle}>{v.title}</Text>
                  <Image {...style.contentsImg} source={v.img} />
                  <Text {...style.contentsSub}>{v.des}</Text>
                </View>
              )
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ToestIntro
