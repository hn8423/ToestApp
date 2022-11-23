import React, {useEffect} from 'react'
import {View, Text} from 'react-native'
import {ResultStackParams, SC} from '../../type'
import useGetStyle from '../../hooks/use-style'
import {useRecoilValue} from 'recoil'
import {ResultDetailInfoState} from '../../atoms/resultDetailInfo'
import useResultDetailInfo from '../../hooks/useResultDetailInfo'

type paramsType = {
  testName: string
  times: number
  level: string
}
const ResultDetail: SC<ResultStackParams, 'ResultDetail'> = ({
  navigation,
  route,
}) => {
  const style = useGetStyle({})
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
  return <View></View>
}

export default ResultDetail
