import React, {useState, useMemo} from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import _ from 'lodash'
import {DrawerScreenProps} from '@react-navigation/drawer'
import TabNavigator from './TabNavigator'
import {
  LoginStackNavigator,
  MyPageStackNavigator,
  PaymentStackNavigator,
  SignUpStackNavigator,
} from './StackNavigator'
import ToestIntro from '../screens/ToestIntro'
import PrivacyPolicy from '../screens/PrivacyPolicy'
import TermsOfUse from '../screens/TermsOfUse'
import SignUpStackParams from '../screens/SignUp'
import LogIn from '../screens/Login'
import {DrawerParamList, LangMap2} from '../type'
import {useNavigation, TabActions} from '@react-navigation/native'
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import {AuthState} from '../atoms/auth'
import {langState} from '../atoms/lang'
import {
  SafeAreaView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import useGetStyle from '../hooks/use-style'
import useAuthLoadEffect from '../hooks/useAuthLoadEffect'
import authStorage from '../storages/authStorage'
import {RegisterTestInfoState} from '../atoms/registertesInfo'
import {ResultInfoState} from '../atoms/resultInfo'
const chartHeight = Dimensions.get('window').height
const chartWidth = Dimensions.get('window').width
const Drawer = createDrawerNavigator<DrawerParamList>()

const globalText: LangMap2 = {
  login: {
    en: 'Log in',
    ko: '로그인 하세요',
  },
  mypage: {
    en: 'My Page',
    ko: '마이 페이지',
  },
  account: {
    en: 'Account Settings',
    ko: '계정 설정',
  },
  payment: {
    en: 'Payment History',
    ko: '결제 확인',
  },
  information: {
    en: 'Information',
    ko: '정보',
  },
  toestIntro: {
    en: 'Toest Intro',
    ko: '토스트 소개',
  },
  privacyPolicy: {
    en: 'Privacy Policy',
    ko: '개인 정보 정책',
  },
  termsOfUse: {
    en: 'Terms of Use',
    ko: '이용 약관',
  },
  NeedHelp: {
    en: 'Need a help?',
    ko: '문의 안내',
  },
  logOut: {
    en: 'Log out',
    ko: '로그아웃',
  },
  logIn: {
    en: 'Log In',
    ko: '로그인',
  },
  toest: {
    en: 'What is TOEST?',
    ko: 'TOEST 란?',
  },
}

type children = {
  name: string
  link: string
  component?: any
}
type menu = {
  name: string
  icon: any
  link: string
  children?: children[]
}

const DrawerNavigator = () => {
  useAuthLoadEffect()
  const navigation = useNavigation()
  const lang = useRecoilValue(langState)
  const [user, setUser] = useRecoilState(AuthState)
  const [, setTestData] = useRecoilState(ResultInfoState)
  const setRegisterTestInfo = useSetRecoilState(RegisterTestInfoState)

  const isLogined = useMemo(() => {
    return !!user
  }, [user])

  const menuTree = useMemo<menu[]>(
    () => [
      {
        name: globalText.mypage[lang],
        icon: require(`../assets/images/drawer/mypage.png`),
        link: '',
        children: [
          {
            name: globalText.account[lang],
            link: '/my_page?to=accountsetting',
            component: 'MyPage',
          },
          {
            name: globalText.payment[lang],
            link: '/my_page?to=payment',
            component: 'MyPage',
          },
        ],
      },
      {
        name: globalText.information[lang],
        icon: require(`../assets/images/drawer/information.png`),
        link: '',
        children: [
          {
            name: globalText.toestIntro[lang],
            link: '/toest_intro',
            component: 'ToestIntro',
          },
          {
            name: globalText.privacyPolicy[lang],
            link: '/Privacy_Policy',
            component: 'PrivacyPolicy',
          },
          {
            name: globalText.termsOfUse[lang],
            link: '/Terms_of_Use',
            component: 'TermsOfUse',
          },
        ],
      },

      {
        name: 'Need a help?',
        icon: require(`../assets/images/drawer/email.png`),
        link: '',
      },
    ],
    [lang],
  )

  //function
  //function
  //function
  const onPressLogOut = () => {
    setUser(null)
    setRegisterTestInfo(null)
    setTestData(null)
    authStorage.clear()
    navigation.dispatch(TabActions.jumpTo('Main'))
  }

  //style
  //style
  //style
  const style = useGetStyle({
    container: {
      flex: 1,
      backgroundColor: '#F8F8FA',
    },

    header: {
      height: 200,
      backgroundColor: '#4ac1eb',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerClose: {
      position: 'absolute',
      right: 10,
      top: 10,
    },
    headerTextTitle: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      color: '#fff',
    },
    headerTextSub: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      color: '#fff',
    },
    body: {
      paddingBottom: 16,
      paddingTop: 8,
    },
    itemWrapper: {
      width: chartWidth - 32,
      backgroundColor: '#fff',
      padding: 24,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 8,
    },
    itemParents: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    itemParentsText: {
      color: '#191919',
    },
    itemParentsImage: {
      marginRight: 4,
    },
    itemChildren: {
      marginTop: 16,
    },
    itemChildrenText: {
      color: '#767676',
    },
    headerLeft: {
      zIndex: 100,
    },
  })
  return (
    <Drawer.Navigator
      screenOptions={{
        headerLeftContainerStyle: {
          paddingLeft: 10,
        },
        headerTitleAlign: 'center',

        drawerStyle: {
          width: Dimensions.get('window').width,
        },
      }}
      drawerContent={({navigation}) => (
        <SafeAreaView>
          <ScrollView>
            <View {...style.container}>
              <View {...style.header}>
                <TouchableOpacity
                  {...style.headerClose}
                  onPress={() => navigation.closeDrawer()}
                >
                  <Image source={require('../assets/images/drawer/x.png')} />
                </TouchableOpacity>
                <Text {...style.headerTextTitle}>
                  {user !== null ? user[0].name : 'TOEST'}
                </Text>
                <Text {...style.headerTextSub}>
                  {user !== null ? user[0].email : ''}
                </Text>
              </View>
              <View {...style.body}>
                {_(menuTree)
                  .map((v, i) => {
                    const child =
                      v.children &&
                      _(v.children)
                        .map((j, i) => (
                          <TouchableOpacity
                            {...style.itemChildren}
                            key={j.name + i}
                            onPress={
                              j.component === 'MyPage'
                                ? () =>
                                    navigation.navigate(j.component, {
                                      defaultScreen: 'account',
                                    })
                                : () => navigation.navigate(j.component)
                            }
                          >
                            <Text {...style.itemChildrenText}>{j.name}</Text>
                          </TouchableOpacity>
                        ))
                        .value()
                    return (
                      <View key={v.name + i} {...style.itemWrapper}>
                        <View {...style.itemParents}>
                          <Image {...style.itemParentsImage} source={v.icon} />
                          <Text {...style.itemParentsText}>{v.name}</Text>
                        </View>
                        <View>{child}</View>
                      </View>
                    )
                  })
                  .value()}
                <TouchableOpacity
                  onPress={
                    isLogined
                      ? onPressLogOut
                      : () => navigation.navigate('LoginStackNavigator')
                  }
                >
                  <View {...style.itemWrapper}>
                    <View {...style.itemParents}>
                      <Image
                        {...style.itemParentsImage}
                        source={
                          isLogined
                            ? require(`../assets/images/drawer/logout.png`)
                            : require(`../assets/images/drawer/login.png`)
                        }
                      />
                      <Text {...style.itemParentsText}>
                        {isLogined
                          ? globalText.logOut[lang]
                          : globalText.logIn[lang]}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    >
      <Drawer.Screen
        name="Main"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="MyPage"
        component={MyPageStackNavigator}
        options={{
          headerTitle: 'Account Settings',
          headerLeft: () => (
            <TouchableOpacity
              {...style.headerLeft}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/images/drawer/goBack.png')} />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="PaymentDrawer"
        component={PaymentStackNavigator}
        options={{
          headerTitle: 'Payment History',
          headerLeft: () => (
            <TouchableOpacity
              {...style.headerLeft}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/images/drawer/goBack.png')} />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="ToestIntro"
        component={ToestIntro}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              {...style.headerLeft}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/images/drawer/goBack.png')} />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              {...style.headerLeft}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/images/drawer/goBack.png')} />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="TermsOfUse"
        component={TermsOfUse}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              {...style.headerLeft}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/images/drawer/goBack.png')} />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="LoginStackNavigator"
        component={LoginStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="SignUpStackNavigator"
        component={SignUpStackNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
