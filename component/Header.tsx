import React from "react";
import {  View,TouchableOpacity,Image,StatusBar } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import useGetStyle from '../hooks/use-style'
import { useNavigation,DrawerActions } from '@react-navigation/native';
import { NavigationProps } from "../type";


const Header = () => {
   const {top} = useSafeAreaInsets()
  const drawerNavigation = useNavigation();
  const style = useGetStyle({
    container:{
      height:56+top,
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      backgroundColor:'#fff',  
      padding:16       
    },
   logo:{
      marginBottom:5
    }
  })
  
  return (
    <SafeAreaView edges={['bottom']} >
      <StatusBar />
           <View {...style.container}>
              <TouchableOpacity onPress={()=>drawerNavigation.dispatch(DrawerActions.openDrawer())} >
          <Image source={require('../assets/images/header/hamburger.png')} />
          </TouchableOpacity  >
              <TouchableOpacity {...style.logo} /* onPress={() => navigation.navigate("Main")} */>
          <Image source={require('../assets/images/header/logo.png')} />
          </TouchableOpacity>
              <TouchableOpacity onPress={()=>{}}>
          <Image source={require('../assets/images/header/circle.png')} />
          </TouchableOpacity>
           </View>
    </SafeAreaView>
  )
}

export default Header