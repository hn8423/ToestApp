import {ColorValue, Text, TouchableOpacity, View} from 'react-native'
import useGetStyle from '../hooks/use-style'

type Props = {
  children: string
  color?: ColorValue
  backgroundColor?: ColorValue
  width?: string | number
  onPress?: any
}

const Button = ({
  children = '',
  color = '#fff',
  backgroundColor = '#4AC1E8',
  width = 'auto',
  onPress = () => {},
}: Props) => {
  const style = useGetStyle({
    wrapper: {
      height: 48,
      width,
      justifyContent: 'center',
      textAlign: 'center',

      padding: 8,
      backgroundColor,
      borderRadius: 8,
    },
    text: {
      color,
      textAlign: 'center',
    },
  })
  return (
    <TouchableOpacity onPress={onPress}>
      <View {...style.wrapper}>
        <Text {...style.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button
