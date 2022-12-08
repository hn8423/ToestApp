import Svg, {Circle, Polygon, Line} from 'react-native-svg'

import useGetStyle from '../hooks/use-style'

type Props = {
  imdlP: number
  lctP: number
  ctP: number
  ccP: number
  imdlPC: number
  lctPC: number
  ccPC: number
  ctPC: number
  clickSvg: (s: React.SetStateAction<number>) => () => void
}

const CompetenceGraph = ({
  imdlP,
  lctP,
  ccP,
  ctP,
  imdlPC,
  lctPC,
  ccPC,
  ctPC,
  clickSvg,
}: Props) => {
  return (
    <Svg>
      <Polygon
        points={`164.25,${lctPC} ${imdlPC},164.25 164.25,${ctPC} ${ccPC},164.25`}
        fill="#cfd6e480"
      />
      <Circle cx="164.25" cy={lctPC} r="3" strokeWidth="4.5" fill="#CFD6E4" />
      <Line
        x1="164.25"
        y1={lctPC}
        x2={imdlPC}
        y2="164.25"
        stroke="#CFD6E4"
        strokeWidth="1px"
      />
      <Circle cx={imdlPC} cy="164.25" r="3" strokeWidth="4.5" fill="#CFD6E4" />
      <Line
        x1={imdlPC}
        y1="164.25"
        x2="164.25"
        y2={ctPC}
        stroke="#CFD6E4"
        strokeWidth="1px"
      />
      <Circle cx="164.25" cy={ctPC} r="3" strokeWidth="4.5" fill="#CFD6E4" />
      <Line
        x1="164.25"
        y1={ctPC}
        x2={ccPC}
        y2="164.25"
        stroke="#CFD6E4"
        strokeWidth="1px"
      />
      <Circle cx={ccPC} cy="164.25" r="3" strokeWidth="4.5" fill="#CFD6E4" />
      <Line
        x1={ccPC}
        y1="164.25"
        x2="164.25"
        y2={lctPC}
        stroke="#CFD6E4"
        strokeWidth="1px"
      />

      <Polygon
        points={`164.25,${lctP} ${imdlP},164.25 164.25,${ctP} ${ccP},164.25`}
        fill="#4ac1e880"
      />
      <Circle cx="164.25" cy={lctP} r="3" strokeWidth="4.5" fill="#4AC1E8" />
      <Line
        x1="164.25"
        y1={lctP}
        x2={imdlP}
        y2="164.25"
        stroke="#4AC1E8"
        strokeWidth="1px"
      />
      <Circle cx={imdlP} cy="164.25" r="3" strokeWidth="4.5" fill="#4AC1E8" />
      <Line
        x1={imdlP}
        y1="164.25"
        x2="164.25"
        y2={ctP}
        stroke="#4AC1E8"
        strokeWidth="1px"
      />
      <Circle cx="164.25" cy={ctP} r="3" strokeWidth="4.5" fill="#4AC1E8" />
      <Line
        x1="164.25"
        y1={ctP}
        x2={ccP}
        y2="164.25"
        stroke="#4AC1E8"
        strokeWidth="1px"
      />
      <Circle cx={ccP} cy="164.25" r="3" strokeWidth="4.5" fill="#4AC1E8" />
      <Line
        x1={ccP}
        y1="164.25"
        x2="164.25"
        y2={lctP}
        stroke="#4AC1E8"
        strokeWidth="1px"
      />
    </Svg>
  )
}

export default CompetenceGraph
