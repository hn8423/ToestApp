import { ColorValue, Text, View } from "react-native"
import useGetStyle from '../hooks/use-style'

type Props = {
  children: string;
  color?: ColorValue;
  backgroundColor?: ColorValue;
  width?: string | number
  
}

const Button = ({children = '', color = '#fff', backgroundColor = '#4AC1E8', width='auto'}:Props) =>{
  const style = useGetStyle({
    wrapper: {
      height:48,
      width,
      justifyContent: 'center',
      textAlign: "center",
      padding:8,
      backgroundColor,
      borderRadius:2
    },
    text:{
      color,
      textAlign:'center'
    }
  })
  return (
    <View {...style.wrapper}>
      <Text {...style.text}>{children}</Text>
    </View>
  )
}

export default Button