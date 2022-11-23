import React, {useState, useRef, useMemo, useEffect, useContext} from 'react'
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native'
import {DrawerParamList, LoginStackParams, SC, ToestRef} from '../type'
import {DrawerScreenProps} from '@react-navigation/drawer'
import Header from '../component/Header'
import useGetStyle from '../hooks/use-style'
import {DrawerActions, StackActions, TabActions} from '@react-navigation/native'
import useLogin from '../hooks/useLogin'
import Button from '../component/Button'
import Toast from '../component/Toest'
import {useRecoilValue} from 'recoil'
import {AuthState} from '../atoms/auth'
import {WebView} from 'react-native-webview'
import baseURL from '../api/baseURL'
import CookieManager from '@react-native-cookies/cookies'
const chartHeight = Dimensions.get('window').height
type DrawerScreenProp = DrawerScreenProps<
  DrawerParamList,
  'LoginStackNavigator'
>
const LogIn: SC<LoginStackParams, 'LogIn'> = ({navigation}) => {
  const user = useRecoilValue(AuthState)
  const webRef = useRef<WebView>(null)
  const toastRef = useRef<ToestRef>()
  const lang = 'en'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cookies, setCookies] = useState({})
  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  })

  const [globalText] = useState({
    passwordInput: {
      en: 'Enter your Password',
      ko: '비밀번호를 입력하세요',
    },
    signUpButton: {
      en: 'Sign Up',
      ko: '회원가입',
    },
    findButton: {
      en: 'Forget your Password?',
      ko: '비밀번호 찾기',
    },
    signInButton: {
      en: 'Sign In',
      ko: '로그인',
    },
    ChangePw: {
      en: 'Forgot your password?',
      ko: '비밀번호 찾기',
    },
    isFull: {
      en: 'There are items that are not entered!',
      ko: '입력되지 않은 항목이 있습니다!',
    },
    isValid: {
      en: 'Enter correctly',
      ko: '올바르게 입력하세요',
    },

    isStandard: {
      en: 'Please check your email or password',
      ko: '이메일 또는 비밀번호를 확인해주세요',
    },
    isEmailValid: {
      en: 'Enter the email format correctly',
      ko: '이메일 형식을 올바르게 입력하세요',
    },
    email: {en: 'Email', ko: '매일'},
    emailInput: {
      en: 'Enter your email address',
      ko: '이메일을 입력하세요.',
    },
    sendEmail: {
      en: 'SEND EMAIL',
      ko: '매일 보내기',
    },
    loginLoading: {
      en: 'is logining',
      ko: '로그인 중입니다.',
    },
    toLogin: {
      en: 'TO SIGN IN',
      ko: '로그인 하기',
    },
    CredentialsSignin: {
      en: `account or password is not valid.`,
      ko: `계정 또는 비밀번호가 옳바르지 않습니다.`,
    },
    OAuthAccountNotLinked: {
      en: `Email already exists. Use a different sns account.`,
      ko: `이미 존재하는 email 입니다. 다른 sns 계정을 사용하세요.`,
    },
    OAuthSignin: {
      en: `Error in constructing an authorization URL`,
      ko: `인증 URL 구성 중 오류`,
    },
    OAuthCallback: {
      en: `Error in handling the response from an OAuth provider.`,
      ko: `OAuth 공급자의 응답을 처리하는 동안 오류가 발생했습니다.`,
    },
    Callback: {
      en: `Error in the OAuth callback handler route`,
      ko: `OAuth 콜백 핸들러 경로 오류`,
    },
    Default: {
      en: `Unknown error`,
      ko: `알 수 없는 오류`,
    },
    checkEmail: {
      en: 'We sent you a temporary password by e-mail. Please log in with the temporary password.',
      ko: '메일로 임시 비밀번호를 발송했습니다. 임시 비밀번호로 로그인 해주시길 바랍니다.',
    },
  })

  // memo
  // memo
  // memo

  const isFull = useMemo(() => {
    return Boolean(email && password)
  }, [email, password])

  const isStandard = useMemo(() => {
    const reg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    return reg.test(password)
  }, [password])

  const isEmailValid = useMemo(() => {
    const reg =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    return reg.test(email)
  }, [email])

  //sever connect
  //sever connect
  //sever connect
  const {mutate: login, isLoading: loginLoading} = useLogin()

  //method
  //method
  //method

  const onClickSignin = () => {
    if (!isFull) {
      toastRef.current?.show(globalText.isFull[lang])
      return
    }

    if (!isStandard) {
      toastRef.current?.show(globalText.isStandard[lang])
      return
    }
    if (!isEmailValid) {
      toastRef.current?.show(globalText.isEmailValid[lang])
      return
    }
    if (loginLoading) {
      toastRef.current?.show(globalText.loginLoading[lang])
      return
    }

    setTimeout(
      webRef.current!.injectJavaScript,
      100,
      `
      __application.signinFn.setPassword("e-test", "${password}")
      __application.signinFn.setEmail("e-test", "${email}")
     `,
    )

    setTimeout(
      webRef.current!.injectJavaScript,
      500,
      `document.querySelector('#__next div[class*="signin_main"] div[class*="signin_main-input-button"]').click()
      `,
    )
    setTimeout(() => {
      // Get cookies for a url
      CookieManager.get(`${baseURL}/mobile/signin`).then(cookies => {
        console.log('CookieManager.get =>', cookies)
      })
    }, 500)
    const fn = () => {
      const body = {email, password}
      login(body)
      navigation.dispatch(TabActions.jumpTo('Main'))
    }
    setTimeout(fn, 1000)
  }

  //password type 변경하는 함수
  const handlePasswordType = (e: any) => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return {type: 'text', visible: true}
      }
      return {type: 'password', visible: false}
    })
  }

  const style = useGetStyle({
    container: {
      // flexGrow: 1,
      height: chartHeight,
      backgroundColor: '#fff',
    },
    social: {
      flexGrow: 0.5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    socialLogo: {
      marginHorizontal: 10,
    },
    input: {
      flex: 1,
      paddingHorizontal: 30,
    },
    button: {
      flex: 0.4,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
      marginBottom: 100,
    },
    inputTitle: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 24,
      letterSpacing: 0.1,
      color: '#767676',
      marginTop: 24,
    },
    signupText: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 16,
      letterSpacing: 1.25,
      textTransform: 'uppercase',
      color: '#4AC1E8',
      marginTop: 16,
    },
    textInput: {
      borderBottomColor: '#999999',
      borderBottomWidth: 1,
      marginTop: 18,
      // paddingVertical:8
    },
    passwordIcon: {
      position: 'absolute',
      right: 10,
      bottom: 10,
    },
  })
  return (
    <>
      {loginLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <>
          <WebView
            ref={webRef}
            source={{
              uri: `${baseURL}/mobile/signin`,
            }}
            style={{
              display: 'none',
            }}
          />

          <Header />

          <ScrollView>
            <View {...style.container}>
              <View {...style.social}>
                <TouchableHighlight>
                  <Image
                    {...style.socialLogo}
                    source={require('../assets/images/login/google.png')}
                  />
                </TouchableHighlight>
                <TouchableHighlight>
                  <Image
                    {...style.socialLogo}
                    source={require('../assets/images/login/facebook.png')}
                  />
                </TouchableHighlight>
                <TouchableHighlight>
                  <Image
                    {...style.socialLogo}
                    source={require('../assets/images/login/kakao.png')}
                  />
                </TouchableHighlight>
              </View>
              <View {...style.input}>
                <Text {...style.inputTitle}>Email</Text>
                <TextInput
                  {...style.textInput}
                  placeholder={globalText.emailInput[lang]}
                  onChangeText={text => setEmail(text)}
                />
                <Text {...style.inputTitle}>Password</Text>
                <View>
                  <TextInput
                    {...style.textInput}
                    placeholder={globalText.passwordInput[lang]}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={!passwordType.visible}
                    onSubmitEditing={onClickSignin}
                    returnKeyType="done"
                  />
                  <TouchableOpacity onPress={handlePasswordType}>
                    {passwordType.visible === true ? (
                      <Image
                        {...style.passwordIcon}
                        source={require('../assets/images/login/invisible.png')}
                      />
                    ) : (
                      <Image
                        {...style.passwordIcon}
                        source={require('../assets/images/login/visible.png')}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.dispatch(StackActions.push('SignUp'))
                  }
                >
                  <Text {...style.signupText}>
                    {globalText.signUpButton[lang]}
                  </Text>
                </TouchableOpacity>
                <View {...style.button}>
                  <Button
                    backgroundColor={'#4AC1E8'}
                    width={328}
                    onPress={onClickSignin}
                  >
                    {globalText.signInButton[lang]}
                  </Button>
                </View>
              </View>
              <Toast ref={toastRef} />
            </View>
          </ScrollView>
        </>
      )}
    </>
  )
}

export default LogIn
