import React, {useEffect, useState, useRef, useMemo} from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import {TestStackParams, SC} from '../../type'
import useGetStyle from '../../hooks/use-style'
import Header from '../../component/Header'
import useTestInfo from '../../hooks/useTestInfo'
import {TestInfoState} from '../../atoms/testInfo'
import {useRecoilValue} from 'recoil'
import {langState} from '../../atoms/lang'
import Sound from 'react-native-sound'
import Button from '../../component/Button'
import baseURL from '../../api/baseURL'
const chartWidth = Dimensions.get('window').width
import {WebView} from 'react-native-webview'
import {AuthState} from '../../atoms/auth'
import useTestSimpleData from '../../hooks/useTestSimpleData'
import {TestSimpleDataState} from '../../atoms/testSimpleData'
import {useIsFocused} from '@react-navigation/native'
type paramsType = {
  testName: string
  times: number
  level: string
}

const music = new Sound(require('../../assets/sounds/sound.mp3'), error => {})

const TestDetail: SC<TestStackParams, 'TestDetail'> = ({navigation, route}) => {
  const [globalText] = useState({
    ko: {
      pleaseCheck: '시험 시작 전 반드시 확인해주세요!',
      testRequirements:
        '시험 환경 요건을 준수하지 않으면, 시험 응시 및 환불이 불가합니다.',
      testEnvironment: '시험 환경',
      browserRecommend:
        '원활한 시험 진행을 위해 다음 운영체제/브라우저 사용을 권장합니다.',
      browser: '브라우저',
      windows: 'Windows 10 이상',
      mac: 'MAC 10.14 이상',
      android: 'Android 10 이상',
      ios: 'iOS 12 이상',
      power: '사용 기기의 전원을 연결하세요.',
      network:
        '안정된 네트워크 환경이 유지될 수 있는 상태에서 시험에 응시하세요.',
      sound: '아래 버튼을 눌러 소리가 들리는지 확인하세요.',
      emptyRoom: '방해 받지 않는 조용하고 독립된 공간에서 진행하세요.',
      shutDownOtherApp:
        '시험 외 다른 브라우저 및 어플리케이션은 모두 종료하세요.',
      ifDifficultySetting:
        '시험 전 환경 설정에 어려움이 있다면 support@metavity.world에 문의하여 주시기 바랍니다.',
      precautions: '응시 중 유의사항',
      examChance: '시험 기간 내 응시 기회는 1번입니다.',
      saveRealTime: '응답한 문항의 답안은 실시간으로 저장됩니다.',
      autoSubmission: '제한 시간이 지나면 답안은 저장 후 자동 제출됩니다.',
      errorAndMistakes: '답안 작성 시 오류 및 실수는 응시자의 책임입니다.',
      reconnect:
        '시험 중 네트워크 끊김이나 기기 오류 발생으로 시험 화면이 종료된 경우, 시험 창에 재접속하여 시험을 이어서 진행해주세요.',
      within30minutes:
        '30분 이내에 시험에 재접속 시 시험 시간은 그대로 유지됩니다.',
      noReconnectingAutomaticallySubmitted:
        '재접속 없이 30분이 지나면 답안은 자동 제출됩니다.',
      tools:
        '시험 중 종이와 필기도구를 사용할 수 있습니다. \n 단, 계산기, 사전, 인쇄물, 또는 온라인 자료는 시험 중 사용할 수 없습니다.',
      survey: '설문지',
      plzSurvey: '시험 마친 후 설문지 작성 부탁드립니다.',
      goSurvey: '설문지 작성하러 가기',
      keys: '시험 중 특수 키(Alt, Ctrl, Window key 등)를 사용하거나 시험 화면 밖으로 마우스 커서를 \n 이동할 수 없습니다.',
      submit: '답안이 정상적으로 제출되었습니다.',
      copyright:
        '본 GPST의 문항을 포함한 모든 컨텐츠의 저작권은 TOEST에 있으며 저작권법에 의해 보호받고 있습니다. 문제의 일부 또는 전부를 무단 복제, 배포, (전자)출판하는 등 저작권을 침해하는 경우 민·형사상의 불이익을 받을 수 있습니다.',
      examRelatedQuestions:
        '시험 관련 문의사항은 (support@metavity.world)로 문의하여 주시기 바랍니다.',
      examResult:
        '시험 결과는 0000년 00월 00일부터 TOEST 홈페이지 시험 결과’에서 확인할 수 있습니다.',
      resultDate1: '시험 결과는',
      resultDate2: '부터 ‘TOEST 홈페이지 > 시험 결과’에서 확인할 수 있습니다.',
      check: '시험 환경 및 유의사항을 모두 확인 하였습니다.',
      checkAlert: '시험 환경 및 유의사항 체크 버튼을 눌러주시길 바랍니다.',
    },

    en: {
      pleaseCheck: 'Please make sure your test environment is ready.',
      testRequirements:
        'You must follow the test environment rules, or you cannot register for the test.',
      testEnvironment: 'Test environments',
      browserRecommend: 'Use the following operating systems and browsers. ',
      browser: 'Browser',
      windows: 'Windows 10 and later',
      mac: 'MAC 10.14 or later',
      android: 'Android 10 or later',
      ios: 'iOS 12 or later',
      power: 'Connect the power to your device.',
      network: 'Make sure you have a reliable internet connection.',
      sound: 'Press the button below to check the sound.',
      emptyRoom: 'Take the test alone in a quiet room. ',
      shutDownOtherApp:
        'Shut down all other browsers and applications except for the test.',
      ifDifficultySetting:
        'If you have difficulty setting up a pre-test environment, \n please contact support@metavity.world',
      precautions: 'Precautions',
      examChance:
        'You have one chance to take the exam during the exam period.',
      saveRealTime: 'Answers are saved in real time.',
      autoSubmission:
        'The answers will be automatically saved and submitted when the time is up. ',
      errorAndMistakes:
        'Errors and mistakes made in exams are the responsibility of the test takers. ',
      reconnect:
        'If the test screen is closed due to network disruption or \n device error during the test, please reconnect to the test window and continue the test.',
      within30minutes:
        'If you reconnect to the test within 30 minutes, the test time will remain the same.',
      noReconnectingAutomaticallySubmitted:
        'After 30 minutes without reconnecting, the answers will be automatically submitted.',
      tools:
        'Writing utensils or paper is allowed. Do not use calculators, dictionaries, printed materials, or online materials during testing.',
      keys: 'You cannot use special keys (Alt, Ctrl, Window key, etc.) or move the mouse cursor out of the test screen during the test.',
      survey: 'Survey',
      plzSurvey: 'After the test is over, please fill out the questionnaire.',
      goSurvey: 'Go to fill out the questionnaire.',
      submit: 'Your answer has been successfully submitted.',
      copyright:
        'The copyright of all contents including the text of GPST belongs to TOEEST and is protected by the Copyright Act. Copyright, such as copying, distributing, or (electronic) publishing of part or all of the problem Violation may result in civil and criminal penalties.',
      examRelatedQuestions:
        'Please contact (support@metavity.world) for any questions related to the exam.',
      examResult:
        'The results of the test can be found at TOEST homepage test results from 00:00 00:00.',
      resultDate1:
        'The results of the test can be found on the TOEST homepage > test results from',
      resultDate2: '',
      check: 'I have reviewed the test environment and precautions.',
      checkAlert:
        'Please press the check button for the test environment and precautions.',
    },
  })
  const lang = useRecoilValue(langState) as 'ko' | 'en'
  const user = useRecoilValue(AuthState)
  const params = route.params as paramsType
  const webRef = useRef<WebView>(null)

  const [testName, setTestName] = useState('')
  const [times, setTimes] = useState(0)
  const [level, setLevel] = useState('')
  const [isSound, setIsSound] = useState(false)
  const {mutate, isLoading} = useTestInfo()
  const [isTest, setIsTest] = useState(false)
  const [userId, setUserId] = useState('')
  const [userCountryCode, setUserCountryCode] = useState('')
  const isFocused = useIsFocused()

  useEffect(() => {
    if (params !== undefined) {
      setTestName(params.testName.split(' ')[0])
      setTimes(params.times)
      setLevel(params.level)
      mutate({testName, times})
    }
  }, [mutate, params, testName, times])

  useEffect(() => {
    if (isSound) {
      music.play()
    } else {
      music.pause()
    }
  }, [isSound])

  useEffect(() => {
    if (user) {
      setUserId(user[0].id)
      setUserCountryCode(user[0].countryCode)
    }
  }, [user])
  useEffect(() => {
    if (!isFocused) {
      navigation.goBack()
    }
  }, [isFocused, navigation])
  const {mutate: getTestSimpleData, isLoading: TestSimpleDataLoading} =
    useTestSimpleData()
  const simpleData = useRecoilValue(TestSimpleDataState)
  useEffect(() => {
    if (user && params) {
      const body = {
        userId: user[0].id,
        level: params.level,
        testName: params.testName,
        times: params.times,
      }
      getTestSimpleData(body)
    }
  }, [getTestSimpleData, level, params, testName, times, user, userId])

  //memo
  //memo
  //memo
  const isFinished = useMemo(() => {
    if (!simpleData) {
      return !simpleData
    }
    return !!simpleData && simpleData.done
  }, [simpleData])

  //onPress
  //onPress
  //onPress
  const onPressSound = () => {
    setIsSound(s => !s)
  }
  const onPressGoTest = () => {
    if (!user) {
      return
    }

    setIsTest(v => !v)
  }
  //style
  //style
  //style
  const style = useGetStyle({
    center: {},
    whiteBox: {
      margin: 16,
      padding: 24,
      backgroundColor: '#fff',
      borderRadius: 8,
    },

    pleaseCheck: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.04,
      textTransform: 'capitalize',
      color: '#00A7E4',
    },
    testRequirements: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.04,
      textTransform: 'capitalize',
      color: '#191919',
      paddingLeft: 24,
    },
    vWrapper: {
      flexDirection: 'row',
    },
    grayWrapper: {
      flexDirection: 'row',
      width: chartWidth - 120,
      marginBottom: 8,
    },
    rowWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },

    title: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      color: '#4AC1E8',
      marginBottom: 24,
    },
    bullet: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      color: '#393939',
      marginBottom: 8,
    },
    circleTitle: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: -0.04,
      color: '#393939',
      marginBottom: 4,
    },
    circleSub: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: -0.04,
      color: '#767676',
    },
    circleImg: {
      backgroundColor: '#e5e5e5',
      borderRadius: 50,
    },
    rowTitleWrapper: {
      marginVertical: 8,
      marginLeft: 20,
    },
    wave: {
      marginLeft: 12,
    },
    grayBox: {
      width: '100%',

      backgroundColor: '#e5e5e5',
      borderRadius: 8,
      paddingVertical: 16,
    },
    testTitle: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
      color: '#191919',
      marginBottom: 8,
    },
    testSub: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: '#767676',
      marginBottom: 8,
    },
    buttonWrapper: {
      paddingVertical: 24,
    },
  })
  return (
    <>
      {isTest && (
        <WebView
          ref={webRef}
          source={{
            uri: `${baseURL}/test/play/${testName}/${times}/${level}/q1?lang=${lang}`,
          }}
          onNavigationStateChange={navState => {
            if (navState.url === `${baseURL}/test/play/done`) {
              if (user) {
                const body = {
                  userId: user[0].id,
                  level,
                  testName,
                  times,
                }
                getTestSimpleData(body)
              }
              setIsTest(false)
            }
          }}
        />
      )}
      {!isTest && (
        <>
          <ScrollView>
            <View {...style.center}>
              <View {...style.whiteBox}>
                <View {...style.vWrapper}>
                  <Image source={require('../../assets/images/test/v.png')} />
                  <Text {...style.pleaseCheck}>
                    {globalText[lang].pleaseCheck}
                  </Text>
                </View>
                <Text {...style.testRequirements}>
                  {globalText[lang].testRequirements}
                </Text>
              </View>
              <View {...style.whiteBox}>
                <Text {...style.title}>
                  {' '}
                  {globalText[lang].testEnvironment}
                </Text>
                <Text {...style.bullet}>
                  {`\u2022 ${globalText[lang].browserRecommend}`}
                </Text>
                <View {...style.rowWrapper}>
                  <Image
                    {...style.circleImg}
                    source={require('../../assets/images/test/pc.png')}
                  />
                  <View {...style.rowTitleWrapper}>
                    <Text {...style.circleTitle}>PC</Text>
                    <Text {...style.circleSub}>{globalText[lang].windows}</Text>
                    <Text {...style.circleSub}>{globalText[lang].mac}</Text>
                  </View>
                </View>
                <View {...style.rowWrapper}>
                  <Image
                    {...style.circleImg}
                    source={require('../../assets/images/test/mobile.png')}
                  />
                  <View {...style.rowTitleWrapper}>
                    <Text {...style.circleTitle}>PC</Text>
                    <Text {...style.circleSub}>{globalText[lang].android}</Text>
                    <Text {...style.circleSub}>{globalText[lang].ios}</Text>
                  </View>
                </View>
                <View {...style.rowWrapper}>
                  <Image
                    {...style.circleImg}
                    source={require('../../assets/images/test/browser.png')}
                  />
                  <View {...style.rowTitleWrapper}>
                    <Text {...style.circleTitle}>PC</Text>
                    <Text {...style.circleSub}>Chrome I Edge I Whale</Text>
                    <Text {...style.circleSub}>Safari I Samsung Internet</Text>
                  </View>
                </View>
                <Text
                  {...style.bullet}
                >{`\u2022 ${globalText[lang].power}`}</Text>
                <Text {...style.bullet}>
                  {`\u2022 ${globalText[lang].network}`}
                </Text>
                <Text
                  {...style.bullet}
                >{`\u2022 ${globalText[lang].sound}`}</Text>
                <View {...style.rowWrapper}>
                  {!isSound ? (
                    <>
                      <TouchableOpacity onPress={onPressSound}>
                        <Image
                          source={require('../../assets/images/test/mute.png')}
                        />
                      </TouchableOpacity>
                      <Image
                        {...style.wave}
                        source={require('../../assets/images/test/unwave.png')}
                      />
                    </>
                  ) : (
                    <>
                      <TouchableOpacity onPress={onPressSound}>
                        <Image
                          source={require('../../assets/images/test/play.png')}
                        />
                      </TouchableOpacity>
                      <Image
                        {...style.wave}
                        source={require('../../assets/images/test/actsound.gif')}
                      />
                    </>
                  )}
                </View>
                <Text {...style.bullet}>
                  {`\u2022 ${globalText[lang].emptyRoom}`}
                </Text>
                <Text {...style.bullet}>
                  {`\u2022 ${globalText[lang].shutDownOtherApp}`}
                </Text>
                <Text {...style.bullet}>
                  {`\u2022 ${globalText[lang].ifDifficultySetting}`}
                </Text>
              </View>
              <View {...style.whiteBox}>
                <Text {...style.title}>{globalText[lang].precautions}</Text>
                <Text
                  {...style.bullet}
                >{`\u2022 ${globalText[lang].examChance}`}</Text>
                <Text
                  {...style.bullet}
                >{`\u2022 ${globalText[lang].saveRealTime}`}</Text>
                <Text
                  {...style.bullet}
                >{`\u2022 ${globalText[lang].autoSubmission}`}</Text>
                <Text
                  {...style.bullet}
                >{`\u2022 ${globalText[lang].errorAndMistakes}`}</Text>
                <Text
                  {...style.bullet}
                >{`\u2022 ${globalText[lang].reconnect}`}</Text>
                <View {...style.grayBox}>
                  <View {...style.grayWrapper}>
                    <Image source={require('../../assets/images/test/v.png')} />
                    <Text {...style.pleaseCheck}>
                      {globalText[lang].within30minutes}
                    </Text>
                  </View>
                  <View {...style.grayWrapper}>
                    <Image source={require('../../assets/images/test/v.png')} />
                    <Text {...style.pleaseCheck}>
                      {globalText[lang].noReconnectingAutomaticallySubmitted}
                    </Text>
                  </View>
                </View>
                <Text
                  {...style.bullet}
                >{`\u2022 ${globalText[lang].tools}`}</Text>
                <Text
                  {...style.bullet}
                >{`\u2022 ${globalText[lang].keys}`}</Text>
              </View>
              <View {...style.whiteBox}>
                <Text {...style.testTitle}>GPST</Text>
                <Text {...style.testTitle}>
                  Global Problem Solving Test(GPST)
                </Text>
                <View {...style.buttonWrapper}>
                  <Button
                    color={'#fff'}
                    backgroundColor={!isFinished ? '#4AC1E8' : '#E1E1E5'}
                    width={'100%'}
                    onPress={!isFinished ? onPressGoTest : () => {}}
                  >
                    GO TEST
                  </Button>
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </>
  )
}

export default TestDetail
