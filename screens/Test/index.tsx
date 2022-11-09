import React from 'react'
import {View, Button, Text, StyleSheet} from 'react-native'
import {NavigationProps} from '../../type'

const Test = ({navigation}: NavigationProps) => {
  return (
    <View style={styles.center}>
      <Text>This is the home screen</Text>
      <Button
        title="Go to TestDetail Screen"
        onPress={() => navigation.navigate('TestDetail')} // We added an onPress event which would navigate to the About screen
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

export default Test
