import {RouteProp, useRoute} from '@react-navigation/native'
import React, {useEffect, useMemo, useState, useRef} from 'react'
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Toast from '../../component/Toest'
import {ToestRef, SC, ApplyStackParams} from '../../type'
import useGetStyle from '../../hooks/use-style'
import {useMutation} from '@tanstack/react-query'
import {detail} from '../../api/apply'
import useTestInfo from '../../hooks/useTestInfo'
import {useRecoilState, useRecoilValue} from 'recoil'
import {TestInfoState} from '../../atoms/testInfo'
import {langState} from '../../atoms/lang'
import _ from 'lodash'
import Button from '../../component/Button'
import {AuthState} from '../../atoms/auth'
import {DrawerActions} from '@react-navigation/native'
import {freepay} from '../../api/apply'
const chartWidth = Dimensions.get('window').width
type DetailScreenRouteProp = RouteProp<ApplyStackParams, 'ApplyDetail'>
const ApplyDetail: SC<ApplyStackParams, 'ApplyDetail'> = ({navigation}) => {
  // data
  // data
  // data

  const globalText = useMemo(() => {
    return {
      overlap: {
        ko: '이미 신청한 레벨입니다.',
        en: 'already register level',
      },
      inputPlaceHolderText: {
        ko: '전화번호를 입력하세요',
        en: 'Enter your phone number.',
      },

      contestdatetitle: {
        ko: `응시일`,
        en: `Contest Date`,
      },

      announcementtitle: {
        ko: `발표일`,
        en: `Announcement`,
      },
      AreasOfEvaluationtitle: {
        ko: `평가영역`,
        en: `Areas of Evaluation
        `,
      },
      notLogined: {
        ko: `로그인이 필요한 서비스 입니다.
로그인 페이지로 이동합니다.`,
        en: `It's a service that requires signin.
Go to the login page.`,
      },
      level: {
        ko: `응시항목을 선택하세요.`,
        en: `Check your level.`,
      },
      check: {
        ko: `이용약관 및 개인정보 보호정책 확인 후 체크 하세요`,
        en: `Check terms of use and privacy policy.`,
      },

      completed: {
        ko: `결제완료`,
        en: `COMPLETED`,
      },
      participantInformation: {
        ko: `응시자 정보`,
        en: `Participant Information`,
      },
      price: {
        ko: `주문금액`,
        en: `Price`,
      },
      name: {
        ko: `이름`,
        en: `name`,
      },
      phoneNumber: {
        ko: `전화번호`,
        en: `Phone Number`,
      },
      method: {
        ko: `결제수단`,
        en: `Method`,
      },
      card: {
        en: `Paying Credit Card`,
        ko: `카드결제`,
      },
      coupon: {
        ko: `쿠폰할인`,
        en: `Coupon Discount Price`,
      },
      orderAmount: {
        ko: `결제금액`,
        en: `Total order amount`,
      },
      payment: {
        ko: `결제상세`,
        en: `Payment`,
      },
      currency: {
        ko: '₩',
        en: '$',
      },
      paypal: {
        ko: `페이팔 결제`,
        en: `PayPal`,
      },
      terms: {
        ko: `이용약관`,
        en: `Terms of Use`,
      },
      privacy: {
        ko: `개인정보 정책`,
        en: `Privacy Policy`,
      },
      notApplicationPeriod: {
        en: `Not application period`,
        ko: `접수기간이 아닙니다.`,
      },
      country: {
        ko: `결제 국가`,
        en: `Country`,
      },
      chregion: {
        ko: `현재 결제 하고 있는 지역을 선택해주세요`,
        en: `Enter the country`,
      },
      chmethod: {
        ko: `결제 방법을 선택해주세요`,
        en: `Select the payment method`,
      },
      credit: {
        ko: `신용 카드 결제`,
        en: `PAY WITH CARD`,
      },
      epay: {
        ko: `간편 결제`,
        en: `EASY PAY`,
      },
      pMethod: {
        ko: `결제 방법 확인 후 체크 하세요`,
        en: `Check all the blanks`,
      },
      region: {
        ko: `결제 국가 확인 후 체크 하세요`,
        en: `Check all the blanks`,
      },
    }
  }, [])
  const {params} = useRoute<DetailScreenRouteProp>()
  const user = useRecoilValue(AuthState)
  const lang = useRecoilValue(langState) as 'en' | 'ko'
  const [testName, setTestName] = useState(params?.testName || '')
  const [times, setTimes] = useState(params?.times || 0)
  const [selectedLevel, selectLevel] = useState('')
  const [checked, setCheck] = useState(false)
  const toastRef = useRef<ToestRef>()
  const [completed, setcompleted] = useState(false)

  const mutationFreepay = useMutation(freepay, {
    onSuccess: data => {
      if (data.message === 'invalid call') {
        toastRef.current?.show(globalText.overlap[lang])
        return
      }
      setcompleted(true)
    },
    onError: error => {
      console.log('err :', error)
    },
  })

  //sever connect
  //sever connect
  //sever connect
  const {mutate, isLoading} = useTestInfo()
  const testInfo = useRecoilState(TestInfoState)
  useEffect(() => {
    if (testName === '' || times === 0) {
      return
    }
    mutate({testName, times})
  }, [mutate, testName, times])
  //useMemo
  //useMemo
  //useMemo
  const img = useMemo(() => {
    switch (testName) {
      case 'GPST':
        return require(`../../assets/images/apply/gpstlong.png`)
      case 'SMC':
        return require(`../../assets/images/apply/smclong.png`)
      case 'E~TEST':
        return require(`../../assets/images/apply/e-testlong.png`)
      default:
        return require(`../../assets/images/apply/gpstlong.png`)
    }
  }, [testName])

  const testLang = useMemo(() => {
    switch (lang) {
      case 'en': {
        return {
          announcement: testInfo[0]?.announcementEn,
          areasOfEvaluation: testInfo[0]?.areasOfEvaluationEn,
          description: testInfo[0]?.descriptionEn,
          name: testInfo[0]?.name,
          levels: testInfo[0]?.levels,
        }
      }
      case 'ko': {
        return {
          announcement: testInfo[0]?.announcementKo,
          areasOfEvaluation: testInfo[0]?.areasOfEvaluationKo,
          description: testInfo[0]?.descriptionKo,
          name: testInfo[0]?.name,
          levels: testInfo[0]?.levels,
        }
      }
    }
  }, [lang, testInfo])

  const levels = useMemo(() => {
    return _(testLang.levels)
      .orderBy(o => o.order, 'asc')
      .map(v => {
        const {descriptionEn, descriptionKo, priceEn, priceKo, ...rest} = v
        switch (lang) {
          case 'en': {
            return {description: descriptionEn, ...rest}
          }
          case 'ko': {
            return {description: descriptionKo, ...rest}
          }
        }
      })
      .value()
  }, [lang, testLang.levels])

  const testLangLevelMap = useMemo(() => {
    return _(levels)
      .keyBy(v => v.name)
      .value()
  }, [levels])
  //onPress
  //onPress
  //onPress
  function onPressSetTargetValue(name: string) {
    return () => {
      selectLevel(name)
    }
  }

  function onPressToggleCheck() {
    setCheck(!checked)
  }

  function onPressGoMyTicket() {
    navigation.dispatch(DrawerActions.jumpTo('MyPage'))
    navigation.goBack()
  }

  function onPressPayment() {
    if (!user) {
      toastRef.current?.show(globalText.notLogined[lang])
      setTimeout(() => {
        navigation.dispatch(DrawerActions.jumpTo('LoginStackNavigator'))
      }, 3000)
      return
    }
    if (selectedLevel === '') {
      toastRef.current?.show(globalText.level[lang])
      return
    }
    if (!checked) {
      toastRef.current?.show(globalText.check[lang])
      return
    }

    const testLevelId = testLangLevelMap[selectedLevel].id
    mutationFreepay.mutate({testLevelId, userId: user[0].id})
  }
  //render
  //render
  //render
  const levelList = useMemo(() => {
    let result = levels.map((v, i) => {
      return (
        <TouchableOpacity
          key={'levelList' + i}
          onPress={onPressSetTargetValue(v.name)}
        >
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 8,
              alignItems: 'center',
            }}
            key={'levelList' + i}
          >
            <View style={{marginRight: 12}}>
              {selectedLevel === v.name ? (
                <Image
                  source={require('../../assets/images/apply/click.png')}
                />
              ) : (
                <Image
                  source={require('../../assets/images/apply/unclick.png')}
                />
              )}
            </View>
            <View>
              <Text
                style={{
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: 14,
                  lineHeight: 24,
                  letterSpacing: 0.1,
                  color: '#191919',
                }}
              >
                {v.displayName}
              </Text>
              <Text
                style={{
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: 12,
                  lineHeight: 16,
                  letterSpacing: 0.4,
                  color: '#767676',
                }}
              >
                {v.description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
    return result
  }, [levels, selectedLevel])

  const style = useGetStyle({
    center: {
      flex: 1,
      alignItems: 'center',
      textAlign: 'center',
      paddingHorizontal: 16,
      paddingVertical: 32,
    },
    block: {
      justifyContent: 'center',
      width: chartWidth - 32,
      padding: 24,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 16,
    },
    mainImg: {
      width: '100%',
      borderRadius: 8,
      resizeMode: 'cover',
      marginTop: 8,
    },
    toest: {
      marginHorizontal: 'auto',
    },
    nameText: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
      textTransform: 'capitalize',
      color: '#191919',
      paddingVertical: 16,
    },

    line: {
      borderWidth: 1,
      borderColor: '#DBDBDB',
      width: '100%',
    },
    volume: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 16,
    },
    volumeLevel: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
      color: '#767676',
    },
    volumePrice: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
      color: '#191919',
    },
    toggleLevel: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
      color: '#191919',
    },
    inputWrapper: {
      marginTop: 16,
    },
    checkWrapper: {
      marginVertical: 32,
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkImg: {
      marginRight: 8,
    },
  })

  return (
    <ScrollView>
      <View {...style.center}>
        <View {...style.block}>
          <View>
            {completed && (
              <Text {...style.toggleLevel}>{globalText.completed[lang]}</Text>
            )}
            <Image {...style.mainImg} source={img} />
            <Text {...style.nameText}>{testLang.name}</Text>
            <View {...style.line}></View>
            {!!selectLevel && (
              <View {...style.volume}>
                <Text {...style.volumeLevel}>{selectedLevel}</Text>
                <Text {...style.volumePrice}>free</Text>
              </View>
            )}
          </View>
        </View>
        {!completed && (
          <>
            <View {...style.block}>
              <View>
                <Text {...style.toggleLevel}>Level</Text>
                <View {...style.inputWrapper}>{levelList}</View>
              </View>
            </View>
            <View {...style.checkWrapper}>
              <TouchableOpacity
                {...style.checkImg}
                onPress={onPressToggleCheck}
              >
                {checked ? (
                  <Image
                    source={require('../../assets/images/apply/check.png')}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/apply/uncheck.png')}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(DrawerActions.jumpTo('TermsOfUse'))
                }
              >
                <Text>{globalText.terms[lang]}</Text>
              </TouchableOpacity>
              <Text>{' ∙ '}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(DrawerActions.jumpTo('PrivacyPolicy'))
                }
              >
                <Text>{globalText.privacy[lang]}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <Button
          color={'#fff'}
          backgroundColor={'#4AC1E8'}
          width={chartWidth - 32}
          onPress={completed ? onPressGoMyTicket : onPressPayment}
        >
          {completed ? 'GO MYTICKET' : 'NEXT'}
        </Button>
        <Toast {...style.toest} ref={toastRef} />
      </View>
    </ScrollView>
  )
}

export default ApplyDetail
