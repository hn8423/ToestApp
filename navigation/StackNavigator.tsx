import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Home from '../screens/Home'
import Apply from '../screens/Apply'
import ApplyDetail from '../screens/Apply/Detail'
import Test from '../screens/Test'
import TestDetail from '../screens/Test/Detail'
import Result from '../screens/Result'
import ResultDetail from '../screens/Result/Detail'
import AccountSetting from '../screens/MyPage/AccountSetting'
import Payment from '../screens/MyPage/Payment'
import LogIn from '../screens/Login'
import SignUpComplete from '../screens/SignUpComplete'
import SignUp from '../screens/SignUp'
import TopTabNavigator from './TopTabNavigator'
import {MainStackParams} from '../type'

const StackMain = createStackNavigator<MainStackParams>()
const StackApply = createStackNavigator()
const StackTest = createStackNavigator()
const StackResult = createStackNavigator()
const StackMyPage = createStackNavigator()
const StackPayment = createStackNavigator()
const StackLogin = createStackNavigator()
const StackSignup = createStackNavigator()

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTintColor: '#000',
  headerBackTitle: '',
  headerShown: false,
}
export const MainStackNavigator = () => {
  return (
    <StackMain.Navigator screenOptions={screenOptionStyle}>
      <StackMain.Screen name="HomeStack" component={Home} />
    </StackMain.Navigator>
  )
}

export const ApplyStackNavigator = () => {
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
export const TestStackNavigator = () => {
  return (
    <StackTest.Navigator screenOptions={screenOptionStyle}>
      <StackTest.Screen name="TestStack" component={Test} />
      <StackTest.Screen
        name="TestDetail"
        component={TestDetail}
        options={{headerShown: true, headerTitle: 'Test'}}
      />
    </StackTest.Navigator>
  )
}
export const ResultStackNavigator = () => {
  return (
    <StackResult.Navigator screenOptions={screenOptionStyle}>
      <StackResult.Screen name="ResultStack" component={Result} />
      <StackResult.Screen
        name="ResultDetail"
        component={ResultDetail}
        options={{
          headerShown: true,
          headerTitle: 'Result',
        }}
      />
    </StackResult.Navigator>
  )
}
export const MyPageStackNavigator = () => {
  return (
    <StackMyPage.Navigator screenOptions={screenOptionStyle}>
      <StackMyPage.Screen name="AccountSetting" component={AccountSetting} />
      {/* <StackPayment.Screen name="Payment" component={Payment} /> */}
    </StackMyPage.Navigator>
  )
}
export const PaymentStackNavigator = () => {
  return (
    <StackPayment.Navigator screenOptions={screenOptionStyle}>
      <StackPayment.Screen name="Payment" component={Payment} />
    </StackPayment.Navigator>
  )
}
export const TopTabNavigatorStackNavigator = () => {
  return (
    <StackPayment.Navigator screenOptions={screenOptionStyle}>
      <StackPayment.Screen
        name="TopTabNavigator"
        component={TopTabNavigator}
        options={{
          headerShown: true,
          headerTitle: 'My Page',
        }}
      />
    </StackPayment.Navigator>
  )
}
export const LoginStackNavigator = () => {
  return (
    <StackLogin.Navigator screenOptions={screenOptionStyle}>
      <StackLogin.Screen name="LogIn" component={LogIn} />
    </StackLogin.Navigator>
  )
}
export const SignUpStackNavigator = () => {
  return (
    <StackSignup.Navigator screenOptions={screenOptionStyle}>
      <StackSignup.Screen name="SignUp" component={SignUp} />
    </StackSignup.Navigator>
  )
}
