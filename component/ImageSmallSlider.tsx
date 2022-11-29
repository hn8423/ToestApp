import _ from 'lodash'
import React, {useMemo, useState} from 'react'
import {Dimensions, View, ActivityIndicator, Image} from 'react-native'
const chartWidth = Dimensions.get('window').width
import Carousel from 'react-native-reanimated-carousel'
import useGetStyle from '../hooks/use-style'

type Props = {
  images: {
    location: any
  }[]
}
type Data = {
  color: string
  image: any
}
const ImageSmallSlider = ({images = []}: Props) => {
  const [viewTarget, setViewTarget] = useState(0)

  const style = useGetStyle({
    container: {
      height: 220,
      paddingLeft: 17,
      paddingTop: 96,
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: chartWidth,
    },
    subtitle: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
      textTransform: 'capitalize',
      color: '#fff',
      marginBottom: 8,
    },
    title: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 28,
      lineHeight: 32,
      letterSpacing: 0.18,

      color: '#fff',
    },
    description: {
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 15,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: '#fff',
      marginBottom: 8,
    },
    dotsNavigation: {
      position: 'absolute',
      top: 200,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'flex-end',
      flexDirection: 'row',
    },
    activeDot: {
      width: 8,
      height: 8,
      backgroundColor: '#fff',
      borderRadius: 50,
      marginHorizontal: 2,
    },
    inactiveDot: {
      width: 8,
      height: 8,
      backgroundColor: '#fff',
      borderRadius: 50,
      opacity: 0.6,
      marginHorizontal: 2,
    },
  })

  const dots = useMemo(() => {
    return images.map((val, i) => {
      return i === viewTarget ? (
        <View key={i + 'dots'} {...style.activeDot}></View>
      ) : (
        <View key={i + 'dots'} {...style.inactiveDot}></View>
      )
    })
  }, [images, style.activeDot, style.inactiveDot, viewTarget])
  return (
    <View>
      <Carousel
        width={chartWidth}
        height={220}
        loop
        autoPlay
        autoPlayInterval={5000}
        data={images}
        onSnapToItem={v => {
          setViewTarget(v)
        }}
        renderItem={v => (
          <View {...style.container}>
            <ActivityIndicator size="small" />
            <Image
              {...style.image}
              resizeMode="cover"
              source={v.item.location}
            />
          </View>
        )}
      />
      {<View {...style.dotsNavigation}>{dots}</View>}
    </View>
  )
}

export default ImageSmallSlider
