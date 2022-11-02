import { Text, View,Image, TouchableHighlight, TouchableOpacity,ScrollView } from "react-native"
import { useState } from "react";
import _ from 'lodash'
import useGetStyle from '../hooks/use-style'
import countryData from '../utills/countryCode'
import {Shadow} from 'react-native-shadow-2'


type Props = {
  setCode:any
}
const globalText = {
  countryInput: {
    en: 'Select Country/Region',
    ko: '국가를 선택하세요',
  },
}

const SearchInput= ({setCode}:Props) => {
    // event
    const lang = 'en'
   const [countryName,setCountryName] = useState('')
    const [isIFocus, setIFocus] = useState(false)
    const Data = countryData.countryCodeList



    type ItemProps = {
      value:{
        alpha_2: string; 
        code_ko: string;
        code_en: string;
      }
    }
  const onPressNation = ({value}:ItemProps) => {
    return ()=>{
      setCode(value.alpha_2)
      setIFocus(!isIFocus)
      setCountryName(value.code_ko)
    }
  }
  const Item = ({ value }:ItemProps) => (
    <TouchableHighlight onPress={onPressNation({value})} underlayColor='#4AC1E814'>
       <View {...style.item}>
         <Text >{value.code_ko}</Text>
       </View>
    </TouchableHighlight>
   );

  const style = useGetStyle({
    wrapper:{
      height:44,
      borderBottomColor: '#DBDBDB',
      borderBottomWidth:1,
      width:'100%',
      justifyContent:'center'
    },
    toggle:{
      position:'absolute',
      right:10,
    },
    listArea:{
      height:200,
      width:'100%',
      borderBottomLeftRadius:16,
      borderBottomRightRadius:16,
      overflow:'scroll'
    },
 
    item:{
      height:40,
      width:'100%',
      paddingHorizontal:16,
      paddingVertical:10,
      justifyContent:'center'
    },
    width:{
      width:'100%'
    },
    text:{
      color: countryName? '#000' : '#999999'
    }
  })
  return(
   <>
    <TouchableOpacity 
      onPress={()=>{setIFocus(!isIFocus)}}        
      >
    <View {...style.wrapper} >
      {isIFocus ? 
        <Image {...style.toggle} source={require('../assets/images/login/up.png')}/>
        : 
        <Image {...style.toggle} source={require('../assets/images/login/down.png')}/>
      }
      <Text {...style.text} >{countryName  ? countryName: globalText.countryInput[lang]}</Text>
    </View>
      </TouchableOpacity>
      {isIFocus && 
      <Shadow {...style.width}>
            <View {...style.listArea} >
        <ScrollView {...style.width} nestedScrollEnabled = {true}>
              {Data.map((v)=>(
                <Item key={v.code_en} {...style.item} value={v}  />
              ))}             
          </ScrollView>
            </View>
      </Shadow>
      }
   </>
  )
}

export default SearchInput