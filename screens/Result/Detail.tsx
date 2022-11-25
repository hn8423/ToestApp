import React, {useEffect, useMemo, useState} from 'react'
import {View, Text} from 'react-native'
import {ResultStackParams, SC} from '../../type'
import useGetStyle from '../../hooks/use-style'
import {useRecoilValue} from 'recoil'
import {ResultDetailInfoState} from '../../atoms/resultDetailInfo'
import useResultDetailInfo from '../../hooks/useResultDetailInfo'
import MobileTab from '../../component/MobileTab'

type paramsType = {
  testName: string
  times: number
  level: string
}
const ResultDetail: SC<ResultStackParams, 'ResultDetail'> = ({
  navigation,
  route,
}) => {
  //STYLE
  //STYLE
  //STYLE
  const style = useGetStyle({})
  //DATA
  //DATA
  //DATA
  const params = route.params as paramsType
  const resultDetailData = useRecoilValue(ResultDetailInfoState)
  const {mutate: resultDetailInfoListMutate} = useResultDetailInfo()
  useEffect(() => {
    if (params) {
      const body = {
        testName: params.testName.split(' ')[0],
        level: params.level,
        times: params.times,
      }
      resultDetailInfoListMutate(body)
    }
  }, [params, resultDetailInfoListMutate])
  const [event, setEvent] = useState(true)
  const [activeTrophy, setActiveTrophy] = useState(0)
  const [isInit, setInit] = useState(false)
  const [isBBan, setBBan] = useState(false)

  //MEMO
  //MEMO
  //MEMO
  const name = useMemo(
    () => resultDetailData?.resultInfo.user.name || '',
    [resultDetailData],
  )

  const score = useMemo(() => {
    return resultDetailData?.resultInfo.scoreMap.score.score
  }, [resultDetailData?.resultInfo.scoreMap.score.score])

  // const [bigObj] = useState({
  //   0: '',
  //   1: <img className={classname('big-obj')} src="/images/result/riboncertificate.png" alt="certificate.png" />,
  //   2: <img className={classname('big-obj')} src="/images/result/ribonbronze.png" alt="bronze.png" />,
  //   3: <img className={classname('big-obj')} src="/images/result/ribonsilver.png" alt="silver.png" />,
  //   4: <img className={classname('big-obj')} src="/images/result/ribongold.png" alt="gold.png" />,
  //   5: <img className={classname('big-obj')} src="/images/result/ribonplatinum.png" alt="platinum.png" />,
  //   6: <img className={classname('big-obj')} src="/images/result/ribonperfect.png" alt="perfect.png" />,
  // })

  // const activeBigObj = useMemo(() => bigObj[activeTrophy], [activeTrophy, bigObj])

  const worldPercentage = useMemo(
    () => resultDetailData?.resultInfo.scoreMap.score.world.topPercentage,
    [resultDetailData?.resultInfo.scoreMap.score.world.topPercentage],
  )

  useEffect(() => {
    if (!worldPercentage) {
      return
    }
    if (score === 100) {
      setActiveTrophy(6)
    } else if (worldPercentage >= 0 && worldPercentage <= 4) {
      setActiveTrophy(5)
    } else if (worldPercentage > 4 && worldPercentage <= 11) {
      setActiveTrophy(4)
    } else if (worldPercentage > 11 && worldPercentage <= 23) {
      setActiveTrophy(3)
    } else if (worldPercentage > 23 && worldPercentage <= 40) {
      setActiveTrophy(2)
    } else if (worldPercentage > 40) {
      setActiveTrophy(1)
    }
  }, [activeTrophy, score, worldPercentage])
  return (
    <View>
      <MobileTab
        testName={params.testName.split(' ')[0]}
        times={params.times}
        level={params.level}
        name={name}
        activeTrophy={activeTrophy}
      />
    </View>
  )
}

export default ResultDetail
