import React from "react";
import { Text, View,TouchableOpacity,Image,Dimensions,StatusBar } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import useGetStyle from '../hooks/use-style'
import { useNavigation,DrawerActions } from '@react-navigation/native';
const chartWidth = Dimensions.get('window').width;


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
              <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}>
          <Image source={require('../assets/images/header/hamburger.png')} />
          </TouchableOpacity>
              <TouchableOpacity {...style.logo} onPress={()=>{}}>
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