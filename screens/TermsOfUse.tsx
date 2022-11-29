import React from 'react'
import {View, Text, ScrollView} from 'react-native'
import {NavigationProps} from '../type'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'
import useGetStyle from '../hooks/use-style'
import globalText from '../lib/globalText/TermsOfUse'

const TermsOfUse = ({navigation}: NavigationProps) => {
  const language = useRecoilValue(langState)
  //style
  //style
  //style
  const style = useGetStyle({
    center: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
      color: '#191919',
    },
    textWrapper: {
      paddingTop: 16,
      paddingBottom: 24,
    },
    text: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4,
      color: '#999999',
    },
  })
  return (
    <ScrollView>
      <View {...style.center}>
        <Text {...style.title}>{globalText.title1[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text1[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title2[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text2[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title3[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text3[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title4[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text4[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title5[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text5[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title6[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text6[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title7[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text7[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title8[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text8[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title9[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text9[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title10[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text10[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title11[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text11[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title12[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text12[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title13[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text13[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title14[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text14[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title15[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text15[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title16[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text16[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title17[language]}</Text>
        <Text {...style.title}>{globalText.title18[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text17[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title19[language]}</Text>
        <View {...style.textWrapper}>
          <Text {...style.text}>{globalText.text18[language]}</Text>
        </View>
        <Text {...style.title}>{globalText.title20[language]}</Text>
      </View>
    </ScrollView>
  )
}

export default TermsOfUse
