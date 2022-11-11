import {useMemo} from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import useGetStyle from '../hooks/use-style'
type Props = {
  title: string
  description: string
  times: number
  navigation: any
  routeName: string
}
const Card = ({
  title = '',
  description = '',
  times = 0,
  navigation,
  routeName = '',
}: Props) => {
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
  const img = useMemo(() => {
    switch (title) {
      case 'GPST':
        return require(`../assets/images/apply/gpst.png`)
      case 'SMC':
        return require(`../assets/images/apply/smc.png`)
      case 'E~TEST':
        return require(`../assets/images/apply/e-test.png`)
      default:
        return require(`../assets/images/apply/gpst.png`)
    }
  }, [title])
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(routeName, {testName: title, times})}
    >
      <View {...style.wrapper}>
        <Image source={img} />
        <View {...style.textWrapper}>
          <Text {...style.title}>{title}</Text>
          <Text {...style.sub}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Card
