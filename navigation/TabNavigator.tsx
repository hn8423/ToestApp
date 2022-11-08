import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {DrawerScreenProps} from '@react-navigation/drawer'
import {
  MainStackNavigator,
  ApplyStackNavigator,
  TestStackNavigator,
  ResultStackNavigator,
  MyPageStackNavigator,
} from './StackNavigator'
import {Image} from 'react-native'
import {DrawerParamList} from '../type'
const Tab = createBottomTabNavigator()
type DrawerScreenProp = DrawerScreenProps<DrawerParamList, 'Main'>

const BottomTabNavigator = ({navigation}: DrawerScreenProp) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          title: 'HOME',
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Image source={require(`../assets/images/home_act.png`)} />
            ) : (
              <Image source={require(`../assets/images/home_unact.png`)} />
            ),
        }}
      />
      <Tab.Screen
        name="Apply"
        component={ApplyStackNavigator}
        options={{
          title: 'APPLY',
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Image source={require(`../assets/images/apply_act.png`)} />
            ) : (
              <Image source={require(`../assets/images/apply_unact.png`)} />
            ),
        }}
      />
      <Tab.Screen
        name="Test"
        component={TestStackNavigator}
        options={{
          title: 'TEST',
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Image source={require(`../assets/images/test_act.png`)} />
            ) : (
              <Image source={require(`../assets/images/test_unact.png`)} />
            ),
        }}
      />
      <Tab.Screen
        name="Result"
        component={ResultStackNavigator}
        options={{
          title: 'RESULT',
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Image source={require(`../assets/images/result_act.png`)} />
            ) : (
              <Image source={require(`../assets/images/result_unact.png`)} />
            ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStackNavigator}
        options={{
          title: 'MYPAGE',
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Image source={require(`../assets/images/my_act.png`)} />
            ) : (
              <Image source={require(`../assets/images/my_unact.png`)} />
            ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
