import React, {useEffect, useMemo, useState} from 'react'
import {View} from 'react-native'
import {ResultStackParams, SC} from '../../type'
import useGetStyle from '../../hooks/use-style'
import {useRecoilValue} from 'recoil'
import {ResultDetailInfoState} from '../../atoms/resultDetailInfo'
import useResultDetailInfo from '../../hooks/useResultDetailInfo'
import MobileTab from '../../component/MobileTab'
import {useIsFocused} from '@react-navigation/native'
import _ from 'lodash'
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
  const isFocused = useIsFocused()

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
  const [activeTrophy, setActiveTrophy] = useState(0)

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
  useEffect(() => {
    if (!isFocused) {
      navigation.pop()
    }
  }, [isFocused, navigation])
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
