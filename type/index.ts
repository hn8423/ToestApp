import { NavigationProp } from "@react-navigation/native";
import { RouteProp } from '@react-navigation/native';
import { CompositeNavigationProp,NavigatorScreenParams  } from "@react-navigation/core";

export type NavigationProps= {
  navigation: NavigationProp<any,any>;
}

/*Tab*/
export type MainParamList ={
  Home: undefined;
  Apply: undefined;
  Test: undefined;
  Result: undefined;
  MyPage: undefined;

};

export type MainNavigationScreenParams = NavigatorScreenParams<MainParamList>

/*Drawer*/
export type DrawerParamList = {
  Main: undefined;
  MyPage: {
    defaultScreen: string;
  };
  ToestIntro: undefined;
  PrivacyPolicy: undefined;
  TermsOfUse: undefined;
  LoginStackNavigator?: undefined;
  LogOut?: undefined;
  Header: undefined
}