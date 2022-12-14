import React, {useCallback, useEffect, useState, useMemo, useRef} from 'react'
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ScrollView,
  Platform,
  Alert,
  ToastAndroid,
  BackHandler,
} from 'react-native'
import {MyPageStackParams, SC, LangMap2, ToestRef} from '../../type'
import Header from '../../component/Header'
import {useMutation} from '@tanstack/react-query'
import {useRecoilState, useRecoilValue} from 'recoil'
import useGetStyle from '../../hooks/use-style'
import {AuthState} from '../../atoms/auth'
import {langState} from '../../atoms/lang'
import Button from '../../component/Button'
import Toast from '../../component/Toest'
import {
  DrawerActions,
  TabActions,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native'
import {updateAccount} from '../../api/mypage'
const chartWidth = Dimensions.get('window').width

import SearchInput from '../../component/SearchInput'
import authStorage from '../../storages/authStorage'

const globalText: LangMap2 = {
  menu1: {
    en: 'My',
    ko: '마이',
  },
  menu2: {
    en: 'Page',
    ko: '페이지',
  },
  menu3: {
    en: 'Account Settings',
    ko: '계정 설정',
  },
  menu4: {
    en: 'Payment',
    ko: '결제 확인',
  },
  menu6: {
    en: 'Sign out',
    ko: '로그아웃',
  },
  menu7: {
    en: 'Sign in',
    ko: '로그인',
  },
  userinfo: {
    en: `User Information`,
    ko: `회원정보`,
  },
  name: {
    en: `User Name`,
    ko: `이름`,
  },
  currentpassword: {
    en: `Current Password`,
    ko: `현재 비밀번호`,
  },
  changepassword: {
    en: `New password`,
    ko: `비밀번호 변경`,
  },
  paymenthistory: {
    en: `Payment History`,
    ko: `결제 내역`,
  },
  accountTitle: {
    en: `Account Settings`,
    ko: `계정 설정`,
  },
  accountName: {
    en: `Name`,
    ko: `이름`,
  },
  accountCountry: {
    en: `Country`,
    ko: `국가`,
  },
  accountEmail: {
    en: `Email`,
    ko: `이메일`,
  },
  accountPassword: {
    en: `Change Password`,
    ko: `비밀번호 변경`,
  },
  morePassword: {
    en: `Repeat your new password`,
    ko: `비밀번호 확인`,
  },
  change: {
    en: `CHANGE`,
    ko: `정보 변경`,
  },
  checkChange: {
    en: 'account changed',
    ko: '계정 정보가 변경 되었습니다.',
  },
  id: {
    en: `ORDER NO. `,
    ko: `결제 번호. `,
  },
  completed: {
    en: `PAYMENT COMPLETED`,
    ko: `결제 완료`,
  },
  refunded: {
    en: `Refund Completed`,
    ko: `환불 완료`,
  },
  refundPayment: {
    en: `Payment Refund`,
    ko: `환불 내역`,
  },
  totalRefund: {
    en: `Total Refund Amount`,
    ko: `총 환불 금액 `,
  },
  participant: {
    en: `Participant Information`,
    ko: `응시자 정보`,
  },
  phone: {
    en: `Phone`,
    ko: `휴대폰 번호`,
  },
  method: {
    en: `Method`,
    ko: `결제 수단`,
  },
  credit: {
    en: `PAY WITH CARD`,
    ko: `카드 결제`,
  },
  payment: {
    en: `Payment`,
    ko: `결제 내역`,
  },
  price: {
    en: `Price`,
    ko: `가격`,
  },
  totalPrice: {
    en: `Total amount`,
    ko: `총 가격`,
  },
  productInfo: {
    en: 'Product Information',
    ko: '상품 정보',
  },
  orderInfo: {
    en: 'Order Information',
    ko: '결제 정보',
  },
  refund: {
    en: 'Refund',
    ko: '환불하기',
  },
  refundButton: {
    en: 'REFUND',
    ko: '환불하기',
  },
  refundComplete: {
    en: 'Refund Complete',
    ko: '환불 완료',
  },
  refundTry: {
    en: `It's a refund`,
    ko: '환불 되었습니다',
  },
  refundCatch: {
    en: 'fail refund',
    ko: '환불이 정상적으로 되지 않았습니다.',
  },

  refundAlert: {
    en: '$ refund',
    ko: '₩ 환불 되었습니다. ',
  },
  failRefundAlert: {
    en: 'fail refund',
    ko: '환불 실패하였습니다.',
  },
  passedRefundAlert: {
    en: 'The refund period has passed.',
    ko: '환불 기간이 지났습니다.',
  },
  nameinput: {
    en: 'Enter your full name.',
    ko: '이름을 입력하세요',
  },
  currentpasswordinput: {
    en: 'Enter your old password here',
    ko: '현재 비밀번호',
  },
  changepasswordinput: {
    en: 'Enter your new password here',
    ko: '새 비밀번호',
  },
  reenterpasswordinput: {
    en: 'Re-enter your new password here',
    ko: '새 비밀번호 확인',
  },
  emailInput: {
    en: 'Enter your email address',
    ko: '이메일을 입력하세요',
  },
  dateType: {
    en: 'year.month.date',
    ko: '년.월.일',
  },
  countryInput: {
    en: 'Select Country/Region',
    ko: '국가를 선택하세요',
  },

  orderDate: {
    ko: '결제 날짜',
    en: 'Order Date',
  },
  orderNo: {
    ko: '결제 번호',
    en: 'Order No.',
  },

  // refund modal
  // refund modal
  // refund modal

  refundTitle: {
    en: 'Refund Policy',
    ko: '환불 정책',
  },
  refundDescription1: {
    en: 'You must cancel your test within 7 days after you register to receive a full refund.',
    ko: '전액 환불을 받으려면 등록 후 7일 이내에 시험을 취소해야 합니다.',
  },

  refundDescription3: {
    en: `If TOEST cancels a test administration, you are eligible for a 100% refund. `,
    ko: 'TOEST측에서 시험 시행을 취소하는 경우, 전액 환불됩니다.',
  },
  refundDescription4: {
    en: `Refunds are issued in the currency used to pay for the test and include taxes as applicable.`,
    ko: `시험 비용을 결제할 때 사용한 통화로 환불되며 해당되는 경우 세금이 포함됩니다.`,
  },
  refundDescription5: {
    en: `Cash refunds aren't available.`,
    ko: `현금으로는 환불되지 않습니다.`,
  },
  tableTitle1: {
    en: 'Time Frame',
    ko: '기간',
  },
  tableTitle2: {
    en: 'Percentage of Refund',
    ko: '환불 비율',
  },
  frame1: {
    en: '0–7 days after you register',
    ko: '등록 후 0-7일 후',
  },
  frame2: {
    en: '8 days after you register–4 days before your test date',
    ko: '등록 후 8일 후-시험 날짜 4일 전',
  },
  frame3: {
    en: '3 or fewer days before your test date, or on or after your test date',
    ko: '시험 날짜까지 3일 미만으로 남은 경우, 또는 시험 당일이나 시험 날짜 이후',
  },
  percentage1: {
    en: '100% test fee refund',
    ko: '100%',
  },
  percentage2: {
    en: '50% test fee refund',
    ko: '50%',
  },
  percentage3: {
    en: 'No refund',
    ko: '환불 없음',
  },
  samePw: {
    en: 'Enter the same password',
    ko: '비밀번호를 모두 동일하게 입력하세요',
  },
  currPw: {
    en: 'Enter your current password',
    ko: '현재 비밀번호를 입력하세요',
  },
  testDonRefund: {
    en: 'You cannot refund because test completed it.',
    ko: '태스트를 완료 하였기에 환불 할 수 없습니다. ',
  },
  requireLogin: {
    en: 'please login',
    ko: '로그인이 필요합니다.',
  },
  notLogined: {
    ko: `로그인이 필요한 서비스 입니다.
로그인 페이지로 이동합니다.`,
    en: `It's a service that requires signin.
Go to the login page.`,
  },
}

const AccountSetting: SC<MyPageStackParams, 'AccountSetting'> = ({
  navigation,
  route,
}) => {
  const params = route.params
  const user = useRecoilValue(AuthState)
  const language = useRecoilValue(langState)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [code, setCode] = useState('')
  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isFocused) {
      return
    }
    if (user) {
      setName(user[0].name)
      setEmail(user[0].email)
      setCode(user[0].countryCode)
    } else {
      if (Platform.OS === 'ios') {
        Alert.alert('message', globalText.notLogined[language])
      } else {
        ToastAndroid.show(globalText.notLogined[language], ToastAndroid.SHORT)
      }
      navigation.dispatch(DrawerActions.jumpTo('LoginStackNavigator'))
    }
  }, [language, navigation, user, isFocused])

  function setTargetValue(
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) {
    return (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setState(e.nativeEvent.text)
    }
  }
  const isLocal = useMemo(() => {
    if (user) {
      setName(user[0].name)
      setCode(user[0].countryCode)
      return user[0].type === 'local'
    }
    return false
  }, [user])
  const chPwValid = useMemo(() => {
    return password === rePassword
  }, [password, rePassword])
  const isExistCurrPW = useMemo(() => !!password, [password])
  //server connect
  //server connect
  //server connect
  const [auth, setAuth] = useRecoilState(AuthState)
  const mutationFreepay = useMutation(updateAccount, {
    onSuccess: data => {
      let copy: any = user
      copy[0].name = data.name
      copy[0].email = data.email
      copy[0].countryCode = data.countryCode
      copy[0].password = data.password
      setAuth(copy)
      authStorage.set(copy)
      if (Platform.OS === 'ios') {
        Alert.alert('message', globalText.checkChange[language])
      } else {
        ToastAndroid.show(globalText.checkChange[language], ToastAndroid.SHORT)
      }
      setTimeout(() => {
        navigation.replace('AccountSetting')
      }, 2000)
    },
    onError: error => {
      console.log('err :', error)
    },
  })

  const clickChange = useCallback(
    async function clickChange() {
      try {
        if (!user) {
          if (Platform.OS === 'ios') {
            Alert.alert('message', globalText.requireLogin[language])
          } else {
            ToastAndroid.show(
              globalText.requireLogin[language],
              ToastAndroid.SHORT,
            )
          }
          setTimeout(() => {
            navigation.dispatch(DrawerActions.jumpTo('LoginStackNavigator'))
          }, 3000)
          return
        }

        if (!rePassword) {
          let body = {name, code, email, userId: user[0].id}
          mutationFreepay.mutate(body)
        } else {
          let body1 = {name, chPW: rePassword, email, code, userId: user[0].id}
          mutationFreepay.mutate(body1)
        }
      } catch (err) {
        console.log('fire err')
      }
    },
    [
      code,
      email,
      language,
      mutationFreepay,
      name,
      navigation,
      rePassword,
      user,
    ],
  )

  const style = useGetStyle({
    wrapper: {
      flex: 1,
      paddingVertical: 32,
      paddingHorizontal: 16,
    },
    topTab: {
      flexDirection: 'row',
    },
    tabBox1: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      width: chartWidth / 2,
      height: 48,
      borderBottomWidth: 2,
      borderBottomColor: '#4AC1E8',
    },

    tabBox2: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      width: chartWidth / 2,
      height: 48,
    },
    BoxText1: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 24,
      textAlign: 'center',
      letterSpacing: 0.1,
      color: '#4AC1E8',
    },
    BoxText2: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 24,
      textAlign: 'center',
      letterSpacing: 0.1,
      color: '#999999',
    },
    whiteBox: {
      width: '100%',
      padding: 24,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginTop: 16,
    },
    title: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
      color: '#191919',
    },
    inputTitle: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 24,
      letterSpacing: 0.1,
      color: '#767676',
      marginTop: 16,
    },
    input: {
      height: 44,
      borderBottomColor: '#DBDBDB',
      borderBottomWidth: 1,

      width: '100%',
      justifyContent: 'center',
    },
    buttonWrapper: {
      paddingTop: 32,
    },
    toest: {
      marginHorizontal: 'auto',
    },
  })
  useFocusEffect(() => {
    const fn = () => {
      navigation.dispatch(DrawerActions.jumpTo('Main'))
      navigation.dispatch(TabActions.jumpTo('Home'))
      return true
    }
    BackHandler.addEventListener('hardwareBackPress', fn)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', fn)
    }
  })
  return (
    <>
      <ScrollView>
        <View {...style.wrapper}>
          <View {...style.whiteBox}>
            <Text {...style.title}>{globalText.accountTitle[language]}</Text>
            <Text {...style.inputTitle}>
              {globalText.accountCountry[language]}
            </Text>
            <SearchInput setCode={setCode} code={code} />
            <Text {...style.inputTitle}>
              {globalText.accountName[language]}
            </Text>
            <TextInput
              {...style.input}
              placeholder={globalText.nameinput[language]}
              onChange={setTargetValue(setName)}
              defaultValue={user ? name : ''}
            />
            <Text {...style.inputTitle}>
              {globalText.accountEmail[language]}
            </Text>
            <TextInput
              {...style.input}
              placeholder={globalText.emailInput[language]}
              onChange={setTargetValue(setEmail)}
              defaultValue={user ? email : ''}
            />
          </View>
          <View {...style.whiteBox}>
            <Text {...style.title}>{globalText.accountPassword[language]}</Text>
            <Text {...style.inputTitle}>
              {globalText.changepassword[language]}
            </Text>
            <TextInput
              {...style.input}
              placeholder={globalText.changepasswordinput[language]}
              onChange={setTargetValue(setPassword)}
              defaultValue={password}
              editable={!isLocal}
              selectTextOnFocus={!isLocal}
            />
            <Text {...style.inputTitle}>
              {globalText.morePassword[language]}
            </Text>
            <TextInput
              {...style.input}
              placeholder={globalText.reenterpasswordinput[language]}
              onChange={setTargetValue(setRePassword)}
              defaultValue={rePassword}
              editable={!isLocal}
              selectTextOnFocus={!isLocal}
            />
          </View>
          <View {...style.buttonWrapper}>
            <Button onPress={clickChange}>{globalText.change[language]}</Button>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default AccountSetting
