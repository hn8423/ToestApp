import React from "react";
import {  TouchableOpacity,Image } from "react-native";
import {SafeAreaView,  useSafeAreaInsets } from "react-native-safe-area-context";
import useGetStyle from '../hooks/use-style'
import { useNavigation,DrawerActions,StackActions } from '@react-navigation/native';

const Header = () => {
   const {top} = useSafeAreaInsets()
  const navigation = useNavigation();
  const style = useGetStyle({
    container:{
      height:56+top,
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      backgroundColor:'#fff',  
      padding:16,    
    },
   logo:{
      marginBottom:5
    }
  })

  const OnPressLogo = () => {
    navigation.dispatch(StackActions.popToTop())
    navigation.dispatch(DrawerActions.jumpTo('Main'))
  }
  
  return (
    <SafeAreaView edges={['left','right']} {...style.container} >
              <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.openDrawer())} >
          <Image source={require('../assets/images/header/hamburger.png')} />
          </TouchableOpacity  >
              <TouchableOpacity {...style.logo} onPress={OnPressLogo}>
          <Image source={require('../assets/images/header/logo.png')} />
          </TouchableOpacity>
              <TouchableOpacity onPress={()=>{}}>
          <Image source={require('../assets/images/header/circle.png')} />
          </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Header