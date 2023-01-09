import {NavigationProp} from '@react-navigation/native'
import {NavigatorScreenParams, ParamListBase} from '@react-navigation/core'
import {FC} from 'react'
import {StackScreenProps} from '@react-navigation/stack'
import {Result} from './result'

export type NavigationProps = {
  navigation: NavigationProp<any, any>
}

/*Tab*/
export type MainParamList = {
  Home: undefined
  Apply: undefined
  Test: undefined
  Result: undefined
  MyPage: undefined
}

/* result top tab */
export type ResultParamList = {
  MobileMyAnswer: {
    resultInfo: Result.DetailDataType['resultInfo']
    testName: string
    times: number
    level: string
    activeTrophy: number
  }
  Competence: undefined
  DomainSpecifics: undefined
  OverAll: undefined
  AiRecommendation: undefined
}

export type MainNavigationScreenParams = NavigatorScreenParams<MainParamList>

/*Drawer*/
export type DrawerParamList = {
  Main: undefined
  MyPage: {
    defaultScreen: string
  }

  PaymentDrawer: undefined
  ToestIntro: undefined
  PrivacyPolicy: undefined
  TermsOfUse: undefined
  LoginStackNavigator?: undefined
  LogOut?: undefined
  Header: undefined
  SignUpStackNavigator?: undefined
}

export type ToestRef = {
  show: (message: string) => void
}

export type MainStackParams = {
  HomeStack?: {}
}
export type ApplyStackParams = {
  ApplyStack?: {}
  ApplyDetail?: {}
}
export type TestStackParams = {
  TestStack?: {}
  TestDetail?: {}
}
export type ResultStackParams = {
  ResultStack?: {}
  ResultDetail?: {}
}
export type MyPageStackParams = {
  AccountSetting?: {}
  Payment?: {}
}
export type LoginStackParams = {
  LogIn?: {}
}
export type SignUpStackParams = {
  SignUp?: {}
}

export type SC<
  T extends ParamListBase,
  K extends keyof T,
  P extends object = {},
> = FC<StackScreenProps<T, K> & P>

type value = {
  [x: string]: string
}
export type LangMap1 = {
  [x in 'en' | 'ko']: value
}
export type LangMap2 = {
  [x: string]: value
}
