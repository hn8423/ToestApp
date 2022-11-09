import React from 'react'
import {View, Button, Text, StyleSheet} from 'react-native'
import {DrawerParamList} from '../type'
import {DrawerScreenProps} from '@react-navigation/drawer'
type DrawerScreenProp = DrawerScreenProps<DrawerParamList, 'MyPage'>
const MyPage = (/* { navigation,route }:DrawerScreenProp */) => {
  // useEffect(()=>{
  //  if(!route.params){
  //   return
  //  }
  // //  console.log(route.params.defaultScreen)
  // },[route.params])
  return (
    <View style={styles.center}>
      <Text>This is the home screen</Text>
      <Button
        title="Go to About Screen"
        // onPress={() => navigation.navigate("About")} // We added an onPress event which would navigate to the About screen
      />
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
})

export default MyPage
