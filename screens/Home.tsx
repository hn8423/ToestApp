import React, { useMemo, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { NavigationProps } from "../type";
import Header from "../component/Header";
import ImageSlider from "../component/ImageSlider";


const Home = ({ navigation }:NavigationProps) => {
  const lang = 'en'
  
  const [globalText] = useState({
    en: {
      gpst: `Global Problem-Solving Test(GPST) is a competition \nthat measures comprehensive problem-solving ability \nbased on the PISA test.`,
      smc: `Silicon Valley Math Contest (SMC) is a competition 
      that measures ability for AI convergence talents. `,
      etest: 'e~Test Professionals is a nationally recognized certification \nproviding a comprehensive evaluation system \nthat assesses Information literacy',
      // psycho:
      //   'Psychoeducational evaluations is an assessment \nusing a variety of tools to develop a complete perspective \nof your child’s academic skills and cognitive abilities',
      title: 'TEST AS A SERVICE',
      bigData: `Driving change \nfor testtakers \nthrough big data`,
      userFriendly: 'User-friendly and accessible, TOEST contains an advanced system to evaluate all learners worldwide.',
      testAsDes: 'Whether you are a parent or an instructor TOEST provides detailed evaluation and actionable feedback. Our asessment do not happen without you.',
    },
    ko: {
      gpst: `글로벌 문제해결력 시험(GPST)는 PISA 평가를 기반으로 하여 \n종합적인 문제 해결 능력을 측정하는 테스트입니다.`,
      smc: `실리콘밸리 수학 시험(SMC)은 수학 교과 역량뿐 아니라 
      AI 융합 소양을 포괄적으로 평가하는 융합 수학 테스트입니다. `,
      etest: 'e~Test Professionals는 개인의 컴퓨터 활용 능력을 검증하는 공인 민간자격시험으로 \n삼성, POSCO, 국방부, 농협 등 다양한 기업에서 인정하고 있습니다.',
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
        key: '',
        location: '../assets/images/home/gpst.png',
        textContents: {
          subtitle: 'GPST',
          title: 'Global Problem\nSolving Test',
          description: textLan.gpst,
          // theme_dark: true,
        },
      },
      {
        key: '',
        location: '../assets/images/home/smc.png',
        textContents: {
          subtitle: 'SMC',
          title: 'Silicon valley\nMath Contes',
          description: textLan.smc,
          // theme_dark: true,
        },
      },
      {
        key: '',
        location: '../assets/images/home/etest.png',
        textContents: {
          subtitle: 'Customized MOS Expertise',
          title: 'e~Test\nProfessionals',
          description: textLan.etest,
          // theme_dark: true,
        },
      },
      // {
      //   key: '',
      //   location: '/images/mobile/main/mobile-bg4.png',
      //   textContents: {
      //     subtitle: 'Behavioral Test',
      //     title: 'Psychoeducational\nEvaluations',
      //     description: textLan.psycho,
      //     // theme_dark: true,
      //   },
      // },
    ],
    [textLan],
  )

    // memo
  // memo
  // memo

  const imageList = useMemo(() => {
    return images.map((v, i) => {
      return { ...v, key: `imageSlider-${i}` }
    })
  }, [images])
  return (
      <>
        <Header/>
      <View style={styles.center}>
        <ImageSlider images={imageList}/>
        <Text>This is the home screen</Text>
        {/* <Button title="Go to About Screen" onPress={() => navigation.navigate("About")} // We added an onPress event which would navigate to the About screen */}
   {/* /> */}
      </View>
      </>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Home;