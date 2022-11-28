import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {DrawerScreenProps} from '@react-navigation/drawer'
import {
  MainStackNavigator,
  ApplyStackNavigator,
  TestStackNavigator,
  ResultStackNavigator,
  MyPageStackNavigator,
  TopTabNavigatorStackNavigator,
} from './StackNavigator'
import TopTabNavigator from './TopTabNavigator'
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
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
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
        component={TopTabNavigator}
        options={{
          headerShown: true,
          headerTitle: 'My Page',
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
