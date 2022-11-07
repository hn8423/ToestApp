import React, {useEffect, useState} from 'react'
import {TouchableOpacity, Image, View, Text} from 'react-native'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context'
import useGetStyle from '../hooks/use-style'
import {
  useNavigation,
  DrawerActions,
  StackActions,
} from '@react-navigation/native'
import {useRecoilState} from 'recoil'
import {langState} from '../atoms/lang'
import DropDownPicker from 'react-native-dropdown-picker'

const Header = () => {
  const {top} = useSafeAreaInsets()
  const navigation = useNavigation()
  const [isdrop, setIsdrop] = useState(false)
  const [lang, setLang] = useRecoilState(langState)
  const [value, setValue] = useState(['en', 'ko'])
  const [items, setItems] = useState([
    {label: 'Spain', value: 'spain'},
    {label: 'Madrid', value: 'madrid', parent: 'spain'},
    {label: 'Barcelona', value: 'barcelona', parent: 'spain'},

    {label: 'Italy', value: 'italy'},
    {label: 'Rome', value: 'rome', parent: 'italy'},

    {label: 'Finland', value: 'finland'},
  ])
  const style = useGetStyle({
    container: {
      // position: 'relative',
      height: 56 + top,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      backgroundColor: '#fff',
      padding: 16,
    },
    logo: {
      marginBottom: 5,
    },
    drop: {
      zIndex: 100,
    },
  })

  const OnPressDrop = () => {
    setIsdrop(!isdrop)
  }

  useEffect(() => {
    console.log(isdrop)
  }, [isdrop])

  const OnPressLogo = () => {
    navigation.dispatch(StackActions.popToTop())
    navigation.dispatch(DrawerActions.jumpTo('Main'))
  }

  return (
    <SafeAreaView edges={['left', 'right']}>
      <View {...style.container}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Image source={require('../assets/images/header/hamburger.png')} />
        </TouchableOpacity>

        <TouchableOpacity {...style.logo} onPress={OnPressLogo}>
          <Image source={require('../assets/images/header/logo.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={OnPressDrop}>
          <Image source={require('../assets/images/header/circle.png')} />
        </TouchableOpacity>
        <DropDownPicker
          open={isdrop}
          value={value}
          items={items}
          setOpen={setIsdrop}
          setValue={setValue}
          setItems={setItems}
          multiple={true}
          {...style.drop}
        />
      </View>
      {/* <TouchableOpacity {...style.logo} onPress={OnPressLogo}>
        <View {...style.drop}>
          <Text>ko</Text>
          <Text>en</Text>
        </View>
      </TouchableOpacity> */}
    </SafeAreaView>
  )
}

export default Header
