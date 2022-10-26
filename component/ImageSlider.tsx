import _ from 'lodash'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, Text, View } from 'react-native';
const chartWidth = Dimensions.get('window').width;
type Props = {
    images: {
      key:string
      location:string
      textContents?: {
        theme_dark?: boolean
        title: string
        subtitle: string
        description: string
      }
    }[]
}
const ImageSlider = ({images=[]}:Props) =>{
  return (
    <View>
      <Text>image slider</Text>
    </View>
  )
}

export default ImageSlider