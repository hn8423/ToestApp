import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator,ApplyStackNavigator,TestStackNavigator,ResultStackNavigator,MyPageStackNavigator } from "./StackNavigator";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();
type Props = {
  defaultScreen: string
}
const BottomTabNavigator = (/* {defaultScreen='Home'}:Props */) => {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown:false
    }}
      // initialRouteName={defaultScreen}
      // initialRouteName='Home'
    >
      <Tab.Screen name="Home" component={MainStackNavigator} options={{
        title: 'HOME',
        tabBarIcon: ({color,size,focused}) => (
         focused? <Image source={require(`../assets/images/home_act.png`)} /> :
         <Image source={require(`../assets/images/home_unact.png`)} />
        )
      }} />
      <Tab.Screen name="Apply" component={ApplyStackNavigator} options={{
        title: 'APPLY',
        tabBarIcon: ({color,size,focused}) => (
         focused? <Image source={require(`../assets/images/apply_act.png`)} /> :
         <Image source={require(`../assets/images/apply_unact.png`)} />
        )
      }}/>
      <Tab.Screen name="Test" component={TestStackNavigator} options={{
        title: 'TEST',
        tabBarIcon: ({color,size,focused}) => (
         focused? <Image source={require(`../assets/images/test_act.png`)} /> :
         <Image source={require(`../assets/images/test_unact.png`)} />
        )
      }}/>
      <Tab.Screen name="Result" component={ResultStackNavigator} options={{
        title: 'RESULT',
        tabBarIcon: ({color,size,focused}) => (
         focused? <Image source={require(`../assets/images/result_act.png`)} /> :
         <Image source={require(`../assets/images/result_unact.png`)} />
        )
      }}/>
      <Tab.Screen name="MyPage" component={MyPageStackNavigator} options={{
        title: 'MYPAGE',
        tabBarIcon: ({color,size,focused}) => (
         focused? <Image source={require(`../assets/images/my_act.png`)} /> :
         <Image source={require(`../assets/images/my_unact.png`)} />
        )
      }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;