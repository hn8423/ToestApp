import _ from 'lodash'
import React, {useMemo, useState} from 'react'
import {Dimensions, Text, View, Image, TouchableOpacity} from 'react-native'
const chartWidth = Dimensions.get('window').width
import Carousel from 'react-native-reanimated-carousel'
import useGetStyle from '../hooks/use-style'

type Props = {
  images:
    | {
        image: string | undefined
        key: string
        order: number
        name: string
        occupation: string
        tags: string
      }[]
    | undefined
}

const ImageSliderPeople = ({images = []}: Props) => {
  const [viewTarget, setViewTarget] = useState(0)

  const style = useGetStyle({
    container: {
      position: 'relative',
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: chartWidth,
      height: 350,
      borderRadius: 66,
    },
    textWrapper: {
      position: 'absolute',
      top: 80,
      left: 20,
      right: 80,
      padding: 16,
      paddingTop: 8,
    },
    sub: {
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
    tagWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    tagItem: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: 16,
      margin: 2,
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
      // top: 0,
      left: 0,
      right: 0,

      bottom: 60,
      justifyContent: 'center',
      alignItems: 'flex-end',
      flexDirection: 'row',
    },
    activeDot: {
      width: 32,
      height: 8,
      backgroundColor: '#CFD6E4',
      borderRadius: 50,
      marginHorizontal: 2,
    },
    inactiveDot: {
      width: 8,
      height: 8,
      backgroundColor: '#CFD6E4',
      borderRadius: 50,
      opacity: 0.6,
      marginHorizontal: 2,
    },
    dot: {
      justifyContent: 'flex-end',
    },
  })

  const dots = useMemo(() => {
    return images.map((val, i) => {
      return i === viewTarget ? (
        <View key={i + 'dots'} {...style.activeDot} />
      ) : (
        <View key={i + 'dots'} {...style.inactiveDot} />
      )
    })
  }, [images, style.activeDot, style.inactiveDot, viewTarget])

  return (
    <View {...style.dot}>
      {images.length !== 0 && (
        <Carousel
          width={chartWidth}
          height={350}
          loop
          autoPlay
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.75,
            parallaxScrollingOffset: 145,
          }}
          snapEnabled={true}
          autoPlayInterval={4000}
          data={images}
          onSnapToItem={v => {
            setViewTarget(v)
          }}
          renderItem={v => (
            <TouchableOpacity key={`renderItem ${v.index}`}>
              <View {...style.container}>
                <Image
                  {...style.image}
                  resizeMode="contain"
                  source={{uri: `https://dev.toest.me${v.item.image}`}}
                />
                <View {...style.textWrapper} pointerEvents="none">
                  <Text {...style.title}>{v.item.name}</Text>
                  <Text {...style.sub}>{v.item.occupation}</Text>
                  <View {...style.tagWrapper}>
                    {v.item.tags.split(', ').map((tag, i) => {
                      return (
                        <View key={`tag ${i}`} {...style.tagItem}>
                          <Text>{tag}</Text>
                        </View>
                      )
                    })}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      <View {...style.dotsNavigation}>{dots}</View>
    </View>
  )
}

export default ImageSliderPeople
