import {NavigationProp} from '@react-navigation/native'
import {NavigatorScreenParams, ParamListBase} from '@react-navigation/core'
import {FC} from 'react'
import {StackScreenProps} from '@react-navigation/stack'

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

export type MainNavigationScreenParams = NavigatorScreenParams<MainParamList>

/*Drawer*/
export type DrawerParamList = {
  Main: undefined
  MyPage: {
    defaultScreen: string
  }
  ToestIntro: undefined
  PrivacyPolicy: undefined
  TermsOfUse: undefined
  LoginStackNavigator?: undefined
  LogOut?: undefined
  Header: undefined
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
}
export type MyPageStackParams = {
  AccountSetting?: {}
  Payment?: {}
}
export type LoginStackParams = {
  LogIn?: {}
  SignUpComplete?: {}
  SignUp?: {}
}

export type SC<T extends ParamListBase, K extends keyof T> = FC<
  StackScreenProps<T, K>
>

type value = {
  [x: string]: string
}
export type LangMap1 = {
  [x in 'en' | 'ko']: value
}
export type LangMap2 = {
  [x: string]: value
}
