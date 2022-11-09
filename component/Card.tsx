import {useMemo} from 'react'
import {Image, Text, View} from 'react-native'
import useGetStyle from '../hooks/use-style'
type Props = {
  title: string
  description: string
}
const Card = ({title = '', description = ''}: Props) => {
  const style = useGetStyle({
    wrapper: {
      width: 155,
      backgroundColor: '#fff',
      margin: 8,
      borderRadius: 16,
      overflow: 'hidden',
    },
    textWrapper: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    title: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: '#191919',
    },
    sub: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4,
      color: '#767676',
    },
  })

  const mainImage = useMemo(() => {}, [])
  return (
    <View {...style.wrapper}>
      <Image source={require(`../assets/images/apply/gpst.png`)} />
      <View {...style.textWrapper}>
        <Text {...style.title}>{title}</Text>
        <Text {...style.sub}>{description}</Text>
      </View>
    </View>
  )
}

export default Card
