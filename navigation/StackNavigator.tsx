import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Home from '../screens/Home'
import Apply from '../screens/Apply'
import ApplyDetail from '../screens/Apply/Detail'
import Test from '../screens/Test'
import TestDetail from '../screens/Test/Detail'
import Result from '../screens/Result'
import AccountSetting from '../screens/MyPage/AccountSetting'
import Payment from '../screens/MyPage/Payment'
import LogIn from '../screens/Login'
import SignUpComplete from '../screens/SignUpComplete'
import SignUp from '../screens/SignUp'
import {MainStackParams} from '../type'

const StackMain = createStackNavigator<MainStackParams>()
const StackApply = createStackNavigator()
const StackTest = createStackNavigator()
const StackResult = createStackNavigator()
const StackMyPage = createStackNavigator()
const StackLogin = createStackNavigator()

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTintColor: '#000',
  headerBackTitle: '',
  headerShown: false,
}
const MainStackNavigator = () => {
  return (
    <StackMain.Navigator screenOptions={screenOptionStyle}>
      <StackMain.Screen name="HomeStack" component={Home} />
    </StackMain.Navigator>
  )
}

const ApplyStackNavigator = () => {
  return (
    <StackApply.Navigator screenOptions={screenOptionStyle}>
      <StackApply.Screen name="ApplyStack" component={Apply} />
      <StackApply.Screen
        name="ApplyDetail"
        component={ApplyDetail}
        options={{headerShown: true, headerTitle: 'Payment Statement'}}
      />
    </StackApply.Navigator>
  )
}
const TestStackNavigator = () => {
  return (
    <StackTest.Navigator screenOptions={screenOptionStyle}>
      <StackTest.Screen name="TestStack" component={Test} />
      <StackTest.Screen name="TestDetail" component={TestDetail} />
    </StackTest.Navigator>
  )
}
const ResultStackNavigator = () => {
  return (
    <StackResult.Navigator screenOptions={screenOptionStyle}>
      <StackResult.Screen name="ResultStack" component={Result} />
    </StackResult.Navigator>
  )
}
const MyPageStackNavigator = () => {
  return (
    <StackMyPage.Navigator screenOptions={screenOptionStyle}>
      <StackMyPage.Screen name="AccountSetting" component={AccountSetting} />
      <StackMyPage.Screen name="Payment" component={Payment} />
    </StackMyPage.Navigator>
  )
}
const LoginStackNavigator = () => {
  return (
    <StackLogin.Navigator screenOptions={screenOptionStyle}>
      <StackLogin.Screen name="LogIn" component={LogIn} />
      <StackLogin.Screen name="SignUpComplete" component={SignUpComplete} />
      <StackLogin.Screen name="SignUp" component={SignUp} />
    </StackLogin.Navigator>
  )
}
export {
  MainStackNavigator,
  ApplyStackNavigator,
  TestStackNavigator,
  ResultStackNavigator,
  MyPageStackNavigator,
  LoginStackNavigator,
}
