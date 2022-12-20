import {View} from 'react-native'
import {Circle, G, TextPath, Path, Line, Defs, Text} from 'react-native-svg'
import {useRecoilValue} from 'recoil'
import {langState} from '../atoms/lang'

import useGetStyle from '../hooks/use-style'
import {LangMap2} from '../type'

type Props = {
  data: {
    clickSVG: (num: React.SetStateAction<number>) => () => void
    active: number
    setActive: React.Dispatch<React.SetStateAction<number>>
    globalText: LangMap2
  }
}

const CompetenceClickGraph = ({
  data: {clickSVG, active, setActive, globalText},
}: Props) => {
  const RADIUSOVERALL = 120
  const RADIUSCOUNTRY = 100
  const RADIUSMY = 80
  const lang = useRecoilValue(langState) as 'en' | 'ko'

  const style = useGetStyle({
    graphText: {
      fontWeight: '500',
      fontSize: 10,
      lineHeight: 16,
      letterSpacing: 0.4,
    },
    graphText2: {
      fontWeight: '500',
      fontSize: 9,
      lineHeight: 16,
      letterSpacing: 0.4,
    },
  })
  return (
    <>
      <Circle
        cx="164.25"
        cy="164.25"
        r="84"
        strokeWidth="1"
        fill={'none'}
        stroke={'#cfd6e4'}
      />
      <Circle
        cx="164.25"
        cy="164.25"
        r="63"
        strokeWidth="1"
        fill={'none'}
        stroke={'#cfd6e4'}
      />
      <Circle
        cx="164.25"
        cy="164.25"
        r="42"
        strokeWidth="1"
        fill={'none'}
        stroke={'#cfd6e4'}
      />
      <Circle
        cx="164.25"
        cy="164.25"
        r="21"
        strokeWidth="1"
        fill={'none'}
        stroke={'#cfd6e4'}
      />
      <Circle
        cx="164.25"
        cy="164.25"
        r="1"
        strokeWidth="1"
        fill={'none'}
        stroke={'#cfd6e4'}
      />
      <Line
        x1="240"
        y1="88.5"
        x2="88.5"
        y2="240"
        stroke="#cfd6e4"
        transform={{rotation: 225, origin: [210, 145.5], translateX: -88.5}}
      />
      <Line
        x1="88.5"
        y1="88.5"
        x2="240"
        y2="240"
        stroke="#cfd6e4"
        transform={{rotation: 225, origin: [210, 145.5], translateX: -91}}
      />
      <Circle
        cx="164.25"
        cy="164.25"
        r="116.25"
        strokeWidth="2em"
        stroke={active === 1 ? '#ffd06d' : '#ffe26d'}
        transform={{
          rotation: -135,
          origin: 82.125,
          translateY: 197.25,
          translateX: 82.125,
        }}
        fill={'none'}
        strokeDashoffset={548}
        strokeDasharray={730}
      />
      <Defs>
        <Path id="text-line1" d="M 1 164 Q 157 -50 327 148 " />
      </Defs>
      <G>
        <Text {...style.graphText} x="3.75" y="0" fill="#fff">
          <TextPath
            xlinkHref="#text-line1"
            startOffset={lang === 'en' ? 156 : 163}
          >
            {globalText[lang].creativeThinking}
          </TextPath>
        </Text>
      </G>
      <Circle
        cx="164.25"
        cy="164.25"
        r="116.25"
        strokeWidth="2em"
        stroke={active === 2 ? '#ff9047' : '#ffa945'}
        transform={{
          rotation: -45,
          origin: 82.125,
          translateY: 80.25,
          translateX: -35,
        }}
        fill={'none'}
        strokeDashoffset={548}
        strokeDasharray={730}
      />
      <Defs>
        <Path id="text-line2" d="M 216 54 Q 337 157 222 272 " />
      </Defs>
      <G>
        <Text {...style.graphText} x="7.75" y="0" fill="#fff">
          <TextPath
            xlinkHref="#text-line2"
            startOffset={lang === 'en' ? 40 : 80}
          >
            {globalText[lang].communicationCollaboration}
          </TextPath>
        </Text>
      </G>
      <Circle
        cx="164.25"
        cy="164.25"
        r="116.25"
        strokeWidth="2em"
        stroke={active === 3 ? '#e56784' : '#e666a9'}
        transform={{
          rotation: 45,
          origin: 82.125,
          translateY: -36,
          translateX: 81.5,
        }}
        fill={'none'}
        strokeDashoffset={548}
        strokeDasharray={730}
      />
      <Defs>
        <Path id="text-line3" d="M 61 235 Q 155 320 238 255" />
      </Defs>
      <G>
        <Text {...style.graphText} fill="#fff">
          <TextPath
            xlinkHref="#text-line3"
            startOffset={lang === 'en' ? 51 : 80}
          >
            {globalText[lang].logicalCriticalthinking}
          </TextPath>
        </Text>
      </G>

      <Circle
        cx="164.25"
        cy="164.25"
        r="116.25"
        strokeWidth="2em"
        stroke={active === 4 ? '#49a7e5' : '#4ac1e8'}
        transform={{
          rotation: 135,
          origin: 82.125,
          translateY: 80.5,
          translateX: 198,
        }}
        fill={'none'}
        strokeDashoffset={548}
        strokeDasharray={730}
      />
      <Defs>
        <Path id="text-line4" d="M 75 80 Q 12 161 80 252 " />
      </Defs>
      <G>
        <Text {...style.graphText2} fill="#fff">
          <TextPath
            xlinkHref="#text-line4"
            startOffset={lang === 'en' ? 2 : 52}
          >
            {globalText[lang].informationMediaDigitalliteracy}
          </TextPath>
        </Text>
      </G>
    </>
  )
}

export default CompetenceClickGraph
