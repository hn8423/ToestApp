import React, { useRef, useState,useMemo, useEffect, useCallback } from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {DrawerScreenProps} from "@react-navigation/drawer"
import TabNavigator from "./TabNavigator";
import MyPage from "../screens/MyPage";
import ToestIntro from "../screens/ToestIntro";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import TermsOfUse from "../screens/TermsOfUse";
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, View,Dimensions, Text,TouchableOpacity, Image, ScrollView, StatusBar } from "react-native";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
const Drawer = createDrawerNavigator();

const globalText:any = {
  login: {
    en: 'Log in',
    ko: '로그인 하세요',
  },
  mypage: {
    en: 'My Page',
    ko: '마이 페이지',
  },
  account: {
    en: 'Account Settings',
    ko: '계정 설정',
  },
  payment: {
    en: 'Payment History',
    ko: '결제 확인',
  },
  information: {
    en: 'Information',
    ko: '정보',
  },
  toestIntro: {
    en: 'Toest Intro',
    ko: '토스트 소개',
  },
  privacyPolicy: {
    en: 'Privacy Policy',
    ko: '개인 정보 정책',
  },
  termsOfUse: {
    en: 'Terms of Use',
    ko: '이용 약관',
  },
  NeedHelp: {
    en: 'Need a help?',
    ko: '문의 안내',
  },
  logOut: {
    en: 'Log out',
    ko: '로그아웃',
  },
  logIn: {
    en: 'Log In',
    ko: '로그인',
  },
  toest: {
    en: 'What is TOEST?',
    ko: 'TOEST 란?',
  },
}
/*Drawer*/
export type DrawerParamList = {
  Main: undefined;
  MyPage: undefined;
  ToestIntro: undefined;
  PrivacyPolicy: undefined;
  TermsOfUse: undefined;

  // Login: undefined;
}
type drawerScreenProp = DrawerScreenProps<DrawerParamList>;


const DrawerNavigator = (/* navigation:any */) => {
  // const navigation = useNavigation<drawerScreenProp>();
  const lang = 'en'
  const isLogined = true
  const [isClosing, setClosing] = useState(false)
  const sideBar = useRef(null)
  const [name, setName] = useState('')
 type children ={
  name: string,
  link: string,
  component?: any
 }
type menu ={ 
        name: string,
      icon: any,
      link: string,
      children?: children[],
}

  const [menuTree, setMenu] = useState<menu[]>([
    {
      name: globalText.mypage[lang],
      icon: require(`../assets/images/drawer/mypage.png`),
      link: '',
      children: [
        { name: globalText.account[lang], link: '/my_page?to=accountsetting', component: 'MyPage' },
        { name: globalText.payment[lang], link: '/my_page?to=payment', component: 'MyPage' },
      ],
    },
    {
      name: globalText.information[lang],
      icon: require(`../assets/images/drawer/information.png`),
      link: '',
      children: [
        {
          name: globalText.toestIntro[lang],
          link: '/toest_intro',
          component: 'PrivacyPolicy' 
        },
        { name: globalText.privacyPolicy[lang], link: '/Privacy_Policy', component: 'PrivacyPolicy' },
        { name: globalText.termsOfUse[lang], link: '/Terms_of_Use', component: 'TermsOfUse' },
      ],
    },

    {
      name: 'Need a help?',
      icon: require(`../assets/images/drawer/email.png`),
      link: '',
      // disable: true,
    },
  ])

  const [loginTree,setLoginTree] = useState<menu[]>([
    {
      name: globalText.mypage[lang],
      icon: require(`../assets/images/drawer/mypage.png`),
      link: '',

    },
    {
      name: globalText.mypage[lang],
      icon: require(`../assets/images/drawer/mypage.png`),
      link: '',
  
    },
  ])

  // renderMap
  // renderMap
  // renderMap




  const loginItem = useMemo(()=>{
    return (
      <View   style={styles.itemWrapper}  >
      <View style={styles.itemParents} >
          <Image style={styles.itemParentsImage} source={isLogined ? require(`../assets/images/drawer/logout.png`) : require(`../assets/images/drawer/login.png`)} />
       <Text>{isLogined ? globalText.logOut[lang] : globalText.logIn[lang]}</Text>
      </View>
 </View>
    )
  },[isLogined, lang])


  // mounted
  // mounted
  // mounted
  return (
    <Drawer.Navigator 
      screenOptions={{
        headerLeft:(()=>(
          <TouchableOpacity style={styles.headerLeft} onPress={()=>{/* navigation.openDrawer() */}}>
            <Image source={require('../assets/images/drawer/goBack.png')} /></TouchableOpacity>
        )),
        headerLeftContainerStyle:{
          paddingLeft:10
        },
        headerTitleAlign:'center',
    
        drawerStyle: {
          width: Dimensions.get('window').width
        },
      
      }}
      drawerContent={({navigation})=>(
        <SafeAreaView>
        <ScrollView>
           <View style={styles.container} >
              <View style={styles.header}>
              <TouchableOpacity
          style={styles.headerClose}
          onPress={()=>navigation.closeDrawer()}
        >
        <Image source={require('../assets/images/drawer/x.png')} />
        </TouchableOpacity>
                <Text style={styles.headerTextTitle} >Hong gill dong</Text>
                <Text  style={styles.headerTextSub}  >email@email.com</Text>
              </View>
              <View style={styles.body}>
              {_(menuTree)
      .map((v,i) => {
        const child = 
          v.children && 
          _(v.children)
          .map((j,i)=> (
            <TouchableOpacity style={styles.itemChildren}  key={j.name+i}  onPress={()=>navigation.navigate(j.component)} >
            
              <Text style={styles.itemChildrenText} >{j.name}</Text>
            </TouchableOpacity>
          )
          ).value()
        return (
          <View  key={v.name+i}  style={styles.itemWrapper}  >
               <View style={styles.itemParents} >
                   <Image style={styles.itemParentsImage} source={v.icon} />
                <Text style={styles.itemParentsText}  >{v.name}</Text>
               </View>
               <View>
               { child}
               </View>
          </View>
        )
      })
      .value()}
              {loginItem}
              </View>
           </View>
      
        </ScrollView  >
        </SafeAreaView>
      )}
    >
      <Drawer.Screen name="Main" component={TabNavigator} />
      <Drawer.Screen name="MyPage" component={MyPage} />
      <Drawer.Screen name="ToestIntro" component={ToestIntro} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Drawer.Screen name="TermsOfUse" component={TermsOfUse} />
    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#F8F8FA'
  },

  header:{
    height:200,
    backgroundColor:'#4ac1eb',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius:10,
    justifyContent:'center',
    alignItems:'center'
  },
  headerClose: {
    position:'absolute',
    right:10,
    top:10
  },
  headerTextTitle:{
    fontStyle: 'normal',
fontWeight: '700',
fontSize: 20,
lineHeight: 24,
color:'#fff'
  },
  headerTextSub:{
    fontStyle: 'normal',
fontWeight: '400',
fontSize: 14,
lineHeight: 20,
color:'#fff'
  },
  body:{
    paddingBottom:16,
    paddingTop:8,
   
  },
  itemWrapper:{
    width:chartWidth-32,
    backgroundColor:'#fff',
    padding:24,
    // margin:16,
    marginVertical:8,
    marginHorizontal:16,
    borderRadius:8
  },
  itemParents:{
    flexDirection:'row',
    alignItems:'flex-end', 
   

  },
  itemParentsText:{
    color:'#191919'
  },
  itemParentsImage: {
    marginRight:4
  },
  itemChildren:{
    marginTop:16
  },
  itemChildrenText:{
    color: '#767676'
  },
  headerLeft:{
    zIndex:100  
  }

}) 

export default DrawerNavigator;