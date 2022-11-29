import React, {useState} from 'react'
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  Modal,
  Pressable,
  Platform,
} from 'react-native'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context'

import useGetStyle from '../hooks/use-style'
import {
  useNavigation,
  DrawerActions,
  StackActions,
  TabActions,
  CommonActions,
  NavigationAction,
} from '@react-navigation/native'
import {useRecoilState} from 'recoil'
import {langState} from '../atoms/lang'

type Props = {
  navigation?: any
}
const Header = () => {
  const {top} = useSafeAreaInsets()
  const navigation = useNavigation()
  const [lang, setLang] = useRecoilState(langState)
  const [modalVisible, setModalVisible] = useState(false)
  const style = useGetStyle({
    container: {
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
    containerOnPress: {
      flex: 1,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      marginTop: Platform.select({
        ios: 90,
        android: 40,
      }),
    },
    modalView: {
      margin: 10,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: '#000',
    },
    modalTextBottom: {
      textAlign: 'center',
      color: '#000',
    },
  })

  const OnPressLogo = () => {
    navigation.dispatch(DrawerActions.jumpTo('Main'))
    navigation.dispatch(TabActions.jumpTo('Home'))
  }

  const OnPressKorean = () => {
    setLang('ko')
    setModalVisible(!modalVisible)
  }
  const OnPressEnglish = () => {
    setLang('en')
    setModalVisible(!modalVisible)
  }

  return (
    <>
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
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={require('../assets/images/header/circle.png')} />
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible)
            }}
          >
            <Pressable
              {...style.containerOnPress}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <View {...style.centeredView}>
                <View {...style.modalView}>
                  <Pressable
                    {...[style.button, style.buttonClose]}
                    onPress={OnPressEnglish}
                  >
                    <Text {...style.modalText}> ENGLISH</Text>
                  </Pressable>
                  <Pressable
                    {...[style.button, style.buttonClose]}
                    onPress={OnPressKorean}
                  >
                    <Text {...style.modalTextBottom}>한국어</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          </Modal>
        </View>
      </SafeAreaView>
    </>
  )
}

export default Header
