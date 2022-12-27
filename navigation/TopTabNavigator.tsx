import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {DrawerScreenProps} from '@react-navigation/drawer'
import {
  MainStackNavigator,
  ApplyStackNavigator,
  TestStackNavigator,
  ResultStackNavigator,
  MyPageStackNavigator,
  PaymentStackNavigator,
} from './StackNavigator'
import {useRecoilState, useRecoilValue} from 'recoil'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {Image, Text} from 'react-native'
import {DrawerParamList, SC, MainStackParams, LangMap2} from '../type'
import {langState} from '../atoms/lang'
import useGetStyle from '../hooks/use-style'
const Tab = createMaterialTopTabNavigator()
// type DrawerScreenProp = DrawerScreenProps<DrawerParamList, 'Main'>
const globalText: LangMap2 = {
  menu1: {
    en: 'Account Settings',
    ko: '계정 설정',
  },
  menu2: {
    en: 'Register',
    ko: '결제 확인',
  },
}
const TopTabNavigator = () => {
  const language = useRecoilValue(langState)
  const style = useGetStyle({
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
  })
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#4AC1E8',
        },
        tabBarActiveTintColor: '#4AC1E8',
      }}
      initialRouteName={'TopPayment'}
    >
      <Tab.Screen
        name="TopAccount"
        component={MyPageStackNavigator}
        options={{
          tabBarLabel: ({color, focused}) =>
            focused ? (
              <Text {...style.BoxText1}>{globalText.menu1[language]}</Text>
            ) : (
              <Text {...style.BoxText2}>{globalText.menu1[language]}</Text>
            ),
        }}
      />
      <Tab.Screen
        name="TopPayment"
        component={PaymentStackNavigator}
        options={{
          tabBarLabel: ({color, focused}) =>
            focused ? (
              <Text {...style.BoxText1}>{globalText.menu2[language]}</Text>
            ) : (
              <Text {...style.BoxText2}>{globalText.menu2[language]}</Text>
            ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TopTabNavigator
