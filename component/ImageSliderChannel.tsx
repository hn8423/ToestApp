import _ from 'lodash'
import React, {useMemo, useState} from 'react'
import {
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native'
const chartWidth = Dimensions.get('window').width
import Carousel from 'react-native-reanimated-carousel'
import useGetStyle from '../hooks/use-style'

type Props = {
  images:
    | {
        location: string
        key: string
        order: number
        name: string
        dom: string
        tags: string
        url: string
      }[]
    | undefined
}

const ImageSliderChannel = ({images = []}: Props) => {
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
      height: 560,
      borderRadius: 16,
    },
    imageCenterWrapper: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#5959',
      borderRadius: 16,
      width: 88,
      height: 88,
      top: '50%',
      left: '50%',
      transform: [{translateX: -50}, {translateY: 200}],
    },
    imageCenter: {
      width: 88,
      height: 88,
      borderRadius: 16,
    },
    textWrapper: {
      position: 'absolute',
      bottom: -560,
      left: 0,
      right: 0,

      padding: 16,
      paddingTop: 8,
      backgroundColor: 'rgba(169, 169, 169, 0.593)',
      borderBottomEndRadius: 16,
      borderBottomLeftRadius: 16,
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
      // backgroundColor: 'red',
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
      left: 0,
      right: 0,
      bottom: 0,
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

  const openUrl = (url: string) => {
    return async () => {
      const supported = await Linking.canOpenURL(url)
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url)
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`)
        console.log(`Don't know how to open this URL: ${url}`)
      }
    }
  }

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
          height={460}
          loop
          autoPlay
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.65,
            parallaxScrollingOffset: 165,
          }}
          snapEnabled={true}
          autoPlayInterval={4000}
          data={images}
          onSnapToItem={v => {
            setViewTarget(v)
          }}
          renderItem={v => (
            <TouchableOpacity
              key={`renderItem ${v.index}`}
              onPress={openUrl(v.item.url)}
            >
              <View {...style.container}>
                <Image
                  {...style.image}
                  resizeMode="cover"
                  source={{uri: v.item.location}}
                  blurRadius={5}
                />
                <View {...style.imageCenterWrapper}>
                  <Image
                    {...style.imageCenter}
                    resizeMode="cover"
                    source={{uri: v.item.location}}
                  />
                </View>
                <View {...style.textWrapper} pointerEvents="none">
                  <Text {...style.title}>{v.item.name}</Text>
                  <Text {...style.sub}>{v.item.dom}</Text>
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

export default ImageSliderChannel
