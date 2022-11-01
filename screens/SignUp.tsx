import React, { useMemo, useState } from 'react'
import { View,  Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import { NavigationProps } from '../type'
import useGetStyle from '../hooks/use-style'
import _ from 'lodash'
import Header from '../component/Header'
import Button from '../component/Button'
import SearchInput from '../component/SearchInput'
import { Shadow } from 'react-native-shadow-2'
const chartHeight = Dimensions.get('window').height
const chartWidth = Dimensions.get('window').width

const globalText = {
  title: {
    en: 'SIGN UP',
    ko: '회원가입',
  },
  country: {
    en: 'Country',
    ko: '국가',
  },
  email: {
    en: 'E-mail',
    ko: '이메일',
  },
  contentstitle: {
    en: 'Personal Information Use Agreement',
    ko: '개인정보 이용동의',
  },
  contents: {
    en: `<Collection and Use of Personal Information>

    Metavity Co., Ltd(hereby referred to as 'Company') is collecting the following personal information from users that are using the service or is creating an account.
    
    1. Collected personal information and collection methods
    The company collects personal information necessary for the first use of the service in order to sign up for membership (or service subscription), facilitate customer consultation, and provide various services. Collected information includes email address, user name, password, and device information depending on the subscription method. If you subscribe to or link your account through SNS such as Facebook, Google, Kakao etc., your account's SNS ID, name, profile picture, gender, and email address are collected. In case of logout, we are requesting e-mail or Facebook, Google, and Kakao account information to avoid inconvenience when accessing the service again.
    If you use individual services in the service, your personal information may be collected further after your consent. 
    In addition, location information, access IP information, access (or authentication) log, AAID or IDFA, visitation date, service use record, sanction, and suspension record can be generated and collected during service use or business processing.
    The personal information described is collected in the course of the program's execution or use, or through a  tool that collects, some information is collected in written forms, faxes, telephone calls, consultation boards, e-mail, and is also provided by other partners.
    
    2. Purpose of the collection of personal information
    Personal information is used for smooth service delivery, membership management, development of new services and service announcements.
    Your personal information is used to identify each other within the service you have subscribed to and to provide parts and content that connect your account or invite your acquaintances through the means of connection you have set (Facebook, Google, and Kakao), and to provide specific customized services. In addition, it is also used for various member management, such as identification and prevention of unauthorized use, confirmation of subscription and duplicate registration, preservation of records for dispute settlement, handling complaints, and delivery of notices.
    In addition, users can use the various marketing and advertising campaigns, such as developing and customizing new services related to the entire service provided by the company, providing services based on statistical characteristics, validating services, providing opportunities to participate in events, providing advertising information, identifying frequency of access, and statistics on members' use of services.
    
    3. Retention of personal information and usage period
    When the purpose of collecting and using personal information is achieved, the data shall be destroyed without delay.
    
    If due to regulations there is a need for the data to be retained, the personal information will be retained for a period of time set according to the related laws. In this case, the company will move the personal information in question to a separate database or separate retention area.
    
    - Records on contracts or withdrawal of subscription: 5 years
    - Records on payments or providing of services: 5 years
    - Records on user's complaint or dispute handling: 3 years
    - Records on the collection, management, and usage of credit information: 3 years
    - Records on displays/advertisements: 6 months
    - Tracked data on user's internet log history and connection route: 3 months
    - Other data for confirmation of communications: 12 months`,
    ko: `
    (주)메타비티(이하 ‘회사’라 합니다)는 최초 회원 가입 또는 서비스 이용 시 이용자로부터 아래와 같은 개인정보를 수집하고 있습니다.

1. 수집하는 개인정보 항목 및 수집방법
회사는 회원가입(또는 서비스 가입), 원활한 고객상담, 각종 서비스의 제공을 위해 서비스 최초 이용 시 필요한 개인정보를 수집하고 있습니다. 회사가 수집하는 정보에는 가입 수단에 따라 이메일 주소, 별명, 비밀번호, 단말기 정보가 있습니다. 페이스북, 구글, 카카오 등의 SNS를 통해 가입 또는 계정 연동을 하는 경우에는 계정 SNS ID, 이름, 프로필사진, 성별, 이메일 주소 등이 수집됩니다. 로그아웃 시에는 서비스에 다시 접속할 때 불편함이 없도록 이메일 또는 페이스북·구글·카카오 계정정보를 필수적으로 요청하고 있습니다.
서비스 내 개별 서비스 등을 이용하는 경우 여러분의 동의 후 개인정보가 추가로 수집될 수 있습니다. 그 밖에도 서비스 이용과정이나 사업처리 과정에서 위치정보, 접속 IP 정보, 접속(또는 인증)로그, AAID 혹은 IDFA, 방문 일시, 서비스 이용기록, 제재 및 이용정지 기록이 생성되어 수집될 수 있습니다.
설명 드린 개인정보는 프로그램의 실행 또는 사용 과정에서 수집되거나 생성정보 수집 툴을 통해 이루어지며 일부 정보는 서면양식, 팩스, 전화, 상담 게시판, 이메일을 통해 수집되고, 기타 협력회사로부터 제공받기도 합니다.

2. 개인정보의 수집 및 이용 목적
개인정보는 원활한 서비스 제공, 회원관리, 신규서비스 개발 및 서비스 안내 등을 위해 활용됩니다. 여러분의 개인정보는 가입하신 서비스 내 상호 식별, 여러분이 설정한 연결수단(페이스북·구글·카카오)으로 계정을 연결하거나 지인을 초대하는 부분 및 컨텐츠 제공, 특정 맞춤 서비스 제공에 활용됩니다. 그 밖에 회원제 서비스 이용에 따른 본인확인, 개인식별, 회사에서 제공하는 제반 서비스에서의 부정이용 및 비인가 사용방지, 가입의사 및 중복가입 확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 고지사항 전달과 같이 다양한 회원 관리를 위해서도 활용됩니다.
이 외에도 회사에서 제공하는 전체 서비스와 관련한 신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 이벤트 참여 기회 제공, 광고성 정보 제공, 접속빈도 파악, 회원의 서비스 이용에 대한 통계와 같은 다양한 마케팅•광고에 활용될 수 있습니다.

3. 개인정보의 보유 및 이용기간 
회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 

단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 개인정보를 보관합니다. 이 경우 회사는 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.

- 계약 또는 청약철회 등에 관련 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률) 
- 대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)
- 소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)
- 신용정보의 수집/처리 및 이용 등에 관한 기록: 3년 (신용정보의 이용 및 보호에 관한 법률)
- 표시/광고에 관한 기록: 6개월 (전자상거래 등에서의 소비자보호에 관한 법률)
- 이용자의 인터넷 등 로그기록/이용자의 접속지 추적자료: 3개월 (통신비밀보호법)
- 그 외의 통신사실 확인자료: 12개월 (통신비밀보호법)
    `,
  },

  agreelabel: {
    en: 'Agree',
    ko: '동의합니다',
  },
  notagreelabel: {
    en: 'Disagree',
    ko: '동의하지 않습니다.',
  },

  emailInput: {
    en: 'Enter your email address',
    ko: '이메일을 입력하세요.',
  },
  userName: {
    en: 'User Name',
    ko: '이름',
  },
  nameInput: {
    en: 'Enter your name',
    ko: '이름을 입력하세요.',
  },
  passwordInput: {
    en: 'Create a password',
    ko: '비밀번호를 입력하세요.',
  },
  passWord: {
    en: 'Password',
    ko: '비밀번호',
  },

  rePasswordInput: {
    en: 'Re-enter a password',
    ko: '비밀번호를 다시 입력하세요',
  },

  pwValidate: {
    en: 'Alphabet + number + special characters. More than 8 digits.',
    ko: '※영문+숫자+특수문자 8자리이상',
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
    en: 'Check the password',
    ko: '비밀번호를 확인하세요',
  },
  isEmailValid: {
    en: 'Enter the email format correctly',
    ko: '이메일 형식을 올바르게 입력하세요',
  },

  signuped: {
    en: 'This is an email that has already been registered.',
    ko: '이미 회원가입된 이메일 입니다.',
  },
  signupUnknown: {
    en: 'Unknown err',
    ko: '알 수 없는 오류로 회원가입이 되지 않습니다',
  },
  agree: {
    en: 'Agree',
    ko: '동의합니다.',
  },
  disAgree: {
    en: 'Disagree',
    ko: '동의하지 않습니다.',
  },
  countryInput: {
    en: 'Select Country/Region',
    ko: '국가를 선택하세요',
  },
  passwordCorrect1: {
    en: 'Password rules do not match.',
    ko: '비밀번호 규칙이 맞지 않습니다.',
  },
  passwordCorrect2: {
    en: 'Passwords do not match.',
    ko: '비밀번호가 일치하지 않습니다.',
  },
  shouldRead: {
    en: 'You really should read it.',
    ko: '개인정보정책을 반드시 읽어 주시길 바랍니다.',
  },
}

const SignUp = ({ navigation }: NavigationProps) => {
  const language = 'en'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pwValidate, setPwValidate] = useState('')
  const [agree, setAgree] = useState('')
  const [chapter, setChapter] = useState(0)
  const [eye, setEye] = useState(false)
  const [code, setCode] = useState('')
  const [userInfo, setUserInfo] = useState({})
  const [isDown,setIsDown ] = useState(false)
  const [isAgree, setIsAgree] = useState(false)

  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  })
  const [passwordType2, setPasswordType2] = useState({
    type: 'password',
    visible: false,
  })

  // memo
  const isValid = useMemo(() => {
    if (pwValidate === '') {
      return true
    }
    return password === pwValidate
  }, [password, pwValidate])

  const isFull = useMemo(() => {
    return Boolean(email && name && password && pwValidate && code)
  }, [email, name, password, pwValidate, code])

  const isStandard = useMemo(() => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    return reg.test(password)
  }, [password])

  const isEmailValid = useMemo(() => {
    const reg =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    return reg.test(email)
  }, [email])
  const isNameValid = useMemo(() => {
    const reg = /^[가-힣a-zA-Z\s]+$/
    return reg.test(name)
  }, [name])

  /**@type {()=>Promise<void>} */
  async function clickNext() {
    switch (chapter) {
      case 0:
        if (isDown && isAgree) {
          setChapter((s) => s + 1)
        }
        break
      case 1:
        if (!isFull) {
          // alert(globalText.isFull[language])
          return
        }
        if (!isValid) {
          // alert(globalText.isValid[language])
          return
        }
        if (!isStandard) {
          // alert(globalText.isStandard[language])
          return
        }
        if (!isEmailValid) {
          // alert(globalText.isEmailValid[language])
          return
        }
        if (!isNameValid) {
          // alert(globalText.isNameValid[language])
          return
        }
        const body = { name, password, email, countryCode: code }
        try {
          // let result = await req2srv.signup(body)
          // setUserInfo(result)
          // req2srvSendCheckMail.sendMail(result)
          setChapter((s) => s + 1)
        } catch (err) {
          // if (err.message === 'email') {
          //   // alert(globalText.signuped[language])
          // } else {
          //   // alert(globalText.signupUnknown[language])
          // }
        }
        break
      case 2:
        setChapter((s) => s + 1)
    }
  }

  //password type 변경하는 함수
  const handlePasswordType = (e: any) => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: 'text', visible: true }
      }
      return { type: 'password', visible: false }
    })
  }
  //password type 변경하는 함수
  const handlePasswordType2 = (e: any) => {
    setPasswordType2(() => {
      if (!passwordType2.visible) {
        return { type: 'text', visible: true }
      }
      return { type: 'password', visible: false }
    })
  }

  const onClickagree = () => {
    setAgree('agree')
  }
  const onClickNotAgree = () => {
    setAgree('disagree')
  }

  const isAgreed = useMemo(() => {
    return agree === 'agree'
  }, [agree])

  const onPressUpDown = () => {
    setIsDown(!isDown)
  }

  const onPressAgree = () => {
    setIsAgree(!isAgree)
  }

  const handleSelect = (e: any) => {
    setCode(e.detail)
  }

  // countryCode
  // const countryCodeList = useMemo(() => _(countryCode.countryCodeList), [])
  // const countryCodeListKO = useMemo(() => {
  //   return countryCodeList
  //     .orderBy((v) => v.code_ko)
  //     .map(({ alpha_2, code_en, code_ko }) => ({ value: alpha_2, text: code_ko }))
  //     .value()
  // }, [countryCodeList])
  // const countryCodeListEN = useMemo(() => {
  //   return countryCodeList
  //     .orderBy((v) => v.code_en)
  //     .map(({ alpha_2, code_en, code_ko }) => ({ value: alpha_2, text: code_en }))
  //     .value()
  // }, [countryCodeList])
  // const countryCodeListByLang = useMemo(() => {
  //   if (language === 'en') {
  //     return countryCodeListEN
  //   } else {
  //     return countryCodeListKO
  //   }
  // }, [countryCodeListEN, countryCodeListKO, language])

  const style = useGetStyle({
    container: {
      backgroundColor: '#fff',
      paddingHorizontal: 16,
      paddingVertical: 24,
    },
    chapter0: {      
      minHeight:chartHeight-150
    },
    chapter1:{

    },
    progressBar: {
      flex: 0.2,
      display: 'flex',
      flexDirection: 'row',
      // backgroundColor:'red',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progress: {
      width: 300,
      height: 4,
      backgroundColor: '#f1f1f5',
      borderRadius: 2,
      marginRight: 10,
    },
    progress1: {
      width: '33%',
      height: 4,
      backgroundColor: '#4ac1eb',
      borderRadius: 10,
    },
    progress2: {
      width: '66%',
      height: 4,
      backgroundColor: '#4ac1eb',
      borderRadius: 10,
    },
    progress3: {
      width: '100%',
      height: 4,
      backgroundColor: '#4ac1eb',
      borderRadius: 10,
    },
    text: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:32
    },
    textStyle1: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 28,
      lineHeight: 32,
      letterSpacing: 0.18,
      color: '#191919',
      marginBottom: 16,
    },
    textStyle2: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
      textTransform: 'capitalize',
      color: '#191919',
      marginBottom: 16,
    },
    textArea: {
      width: '100%',
      // height: 312,
      borderRadius: 8,
      padding: 16,
      marginBottom: 10,
      overflow: 'hidden',
    },
    textAreaShort: {
      width: '100%',
      flexDirection:'row',
      alignItems:"center",
      justifyContent:"space-between",
      marginBottom:16
    },
    textAreaShortLeft:{
      flexDirection:'row',
      alignItems:'center'
    },
    textContentWrapper:{
      height: 300,
    },
    textContent:{
      width:chartWidth-100,
      borderRadius:8,
      padding:8,

    },
    toggle: {
      flex: 0.7,
    },
    togglePart:{
      flexDirection:'row',
      alignItems:'center',
    },
    togglePartItem:{
      paddingLeft:10
    },
    toggleText:{
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.5,
      color: "#191919",
        },
    button: {
      flex: 0.4,
      marginTop:16
    },
    inputText:{
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 24,
      letterSpacing: 0.1,
      color: '#767676',
    }
  })
  return (
    <>
      <Header />
      <ScrollView>
        <View {...style.container}>
          <View {...style.progressBar}>
            <View {...style.progress}>
              {chapter === 0 && <View {...style.progress1}></View>}
              {chapter === 1 && <View {...style.progress2}></View>}
              {chapter === 2 && <View {...style.progress3}></View>}
            </View>
            <Text>{chapter + 1}/3</Text>
          </View>
              <View {...style.text}>
                <Text {...style.textStyle1}>{globalText.title[language]}</Text>
                <Text {...style.textStyle2}>{chapter === 0 && globalText.contentstitle[language]}</Text>
              </View>
          {chapter === 0 && (
            <View {...style.chapter0}>
              <View {...style.textArea}>
                <View {...style.textAreaShort}>
                <View {...style.textAreaShortLeft}>
                    <Image source={require('../assets/images/login/warning.png')}/>
                    <Text>{globalText.shouldRead[language]}</Text>
                </View>
                <TouchableOpacity onPress={onPressUpDown}>
                    {isDown ? <Image source={require('../assets/images/login/up.png')}/> 
                    : <Image source={require('../assets/images/login/down.png')}/>}
                </TouchableOpacity>                
                </View>                
                  {isDown && 
                 <ScrollView {...style.textContentWrapper} >
                      <View {...style.textContent} >
                        <Text>{globalText.contents[language]}</Text>
                      </View>
                 </ScrollView>
                } 
              </View>
              <View {...style.toggle}>
             <TouchableOpacity {...style.togglePart}  onPress={onPressAgree} >
               <>
                  {isAgree ? <Image source={require('../assets/images/login/agree.png')}/>
                  :
                  <Image  source={require('../assets/images/login/disagree.png')}/>
                  }
                  <View {...style.togglePartItem}><Text {...style.toggleText}>{globalText.agree[language]}</Text></View>
               </>
             </TouchableOpacity>
             <TouchableOpacity {...style.togglePart}  onPress={onPressAgree} >
               <>
                  {!isAgree ? <Image source={require('../assets/images/login/agree.png')}/>
                  :
                  <Image  source={require('../assets/images/login/disagree.png')}/>
                  }
                  <View {...style.togglePartItem}><Text {...style.toggleText}>{globalText.disAgree[language]}</Text></View>
               </>
             </TouchableOpacity>
     
              </View>
              <View {...style.button}>
                <Button backgroundColor={'#4AC1E8'} width={'100%'} onPress={clickNext} >NEXT</Button>
              </View>
            </View>
          )}
          {chapter === 1 && 
          <View {...style.chapter1}>
            <Text {...style.inputText}>{globalText.country[language]}</Text>
            <SearchInput/>
          </View>
          }
        </View>
      </ScrollView>
    </>
  )
}

export default SignUp

