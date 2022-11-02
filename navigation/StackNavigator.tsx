import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Apply from "../screens/Apply";
import ApplyDetail from "../screens/Apply/Detail";
import Test from "../screens/Test";
import TestDetail from "../screens/Test/Detail";
import Result from "../screens/Result";
import MyPage from "../screens/MyPage";
import LogIn from "../screens/Login";
import SignUpComplete from "../screens/SignUpComplete";
import SignUp from "../screens/SignUp";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  headerShown:false
};
const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
    >
      <Stack.Screen name="HomeStack" component={Home} />
    </Stack.Navigator>
  );
}

const ApplyStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="ApplyStack" component={Apply} />
      <Stack.Screen name="ApplyDetail" component={ApplyDetail} />
    </Stack.Navigator>
  );
}
const TestStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="TestStack" component={Test} />
      <Stack.Screen name="TestDetail" component={TestDetail} />
    </Stack.Navigator>
  );
}
const ResultStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="ResultStack" component={Result} />
    </Stack.Navigator>
  );
}
const MyPageStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="MyPage" component={MyPage} />
    </Stack.Navigator>
  );
}
const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUpComplete" component={SignUpComplete} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
export { MainStackNavigator,ApplyStackNavigator,TestStackNavigator,ResultStackNavigator,MyPageStackNavigator,LoginStackNavigator };