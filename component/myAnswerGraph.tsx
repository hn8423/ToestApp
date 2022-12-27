import {Text, View} from 'react-native'
import Svg, {Circle} from 'react-native-svg'

import useGetStyle from '../hooks/use-style'

type Props = {
  data: {
    worldScore: number
    countryScore: number
    myScoreReal: number
    worldWide: string
  }
}

const MyAnswerGraph = ({
  data: {worldScore, countryScore, myScoreReal, worldWide},
}: Props) => {
  const RADIUSOVERALL = 120
  const RADIUSCOUNTRY = 100
  const RADIUSMY = 80
  const CIRCUMFERENCEOVERALL = 2 * Math.PI * RADIUSOVERALL
  const CIRCUMFERENCECOUNTRY = 2 * Math.PI * RADIUSCOUNTRY
  const CIRCUMFERENCEMY = 2 * Math.PI * RADIUSMY
  const style = useGetStyle({
    myAnswerGraphWrapper: {
      alignItems: 'center',
      paddingVertical: 32,
      position: 'relative',
    },
    myAnwerGraphText: {
      transform: [{rotateZ: '90deg'}],
    },

    Textwrapper: {
      position: 'absolute',
      top: '45%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    TopText: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
      color: '#000',
    },
    PercentText: {
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 36,
      lineHeight: 48,
      color: '#000',
    },
    WorldWideText: {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 10,
      lineHeight: 16,
      letterSpacing: 0.4,
      color: '#767676',
    },
  })
  return (
    <View {...style.myAnswerGraphWrapper}>
      <Svg viewBox="0 0 255 255" width="255" height="255">
        <Circle
          cx="127.5"
          cy="127.5"
          r={RADIUSOVERALL}
          fill="none"
          stroke={'#e6e6e6'}
          strokeWidth="12"
        />
        <Circle
          cx="127.5"
          cy="127.5"
          r={RADIUSOVERALL}
          fill="none"
          stroke={'#7dd2ee'}
          strokeWidth="12"
          strokeDasharray={CIRCUMFERENCEOVERALL}
          strokeDashoffset={CIRCUMFERENCEOVERALL * (1 - worldScore / 100)}
          strokeLinecap={'round'}
          transform={{rotation: -90, origin: 63.75, translateY: 127.5}}
        />

        <Circle
          cx="127.5"
          cy="127.5"
          r={RADIUSCOUNTRY}
          fill="none"
          stroke={'#e6e6e6'}
          strokeWidth="12"
        />
        <Circle
          cx="127.5"
          cy="127.5"
          r={RADIUSCOUNTRY}
          fill="none"
          stroke={'#1ab3e5'}
          strokeWidth="12"
          strokeDasharray={CIRCUMFERENCECOUNTRY}
          strokeDashoffset={CIRCUMFERENCECOUNTRY * (1 - countryScore / 100)}
          strokeLinecap={'round'}
          transform={{rotation: -90, origin: 63.75, translateY: 127.5}}
        />

        <Circle
          cx="127.5"
          cy="127.5"
          r={RADIUSMY}
          fill="none"
          stroke={'#e6e6e6'}
          strokeWidth="12"
        />
        <Circle
          cx="127.5"
          cy="127.5"
          r={RADIUSMY}
          fill="none"
          stroke={'#0086c3'}
          strokeWidth="12"
          strokeDasharray={CIRCUMFERENCEMY}
          strokeDashoffset={CIRCUMFERENCEMY * (1 - myScoreReal / 100)}
          strokeLinecap={'round'}
          transform={{rotation: -90, origin: 63.75, translateY: 127.5}}
        />
        {/* <G> 
        <Text
          {...style.TopText}
          x={'50%'}
          y="105"
          fill="#000"
          textAnchor="middle"
        >
          TOP
        </Text>
        </G> */}
        {/* <G>
            <Text
              {...style.PercentText}
              x={'51%'}
              y="140.5"
              fill="#000"
              textAnchor="middle"
            >
              {worldWide !== 'NaN0' ? `${worldWide}%` : '0%'}
            </Text>
      
        </G> */}
        {/* <G>
          <Text
            {...style.WorldWideText}
            x={'50%'}
            y="162.5"
            fill="#767676"
            textAnchor="middle"
          >
            WORLDWIDE
          </Text>
        </G> */}
      </Svg>
      <View {...style.Textwrapper}>
        <Text {...style.TopText}>TOP</Text>
        <Text {...style.PercentText}>
          {worldWide !== 'NaN0' ? `${worldWide}%` : '0%'}
        </Text>
        <Text {...style.WorldWideText}>WORLDWIDE</Text>
      </View>
    </View>
  )
}

export default MyAnswerGraph
