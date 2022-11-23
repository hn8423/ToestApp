import {useMutation} from '@tanstack/react-query'
import {pay} from '../api/apply'
import {resultDetailData} from '../api/resultDetailData'
import {useSetRecoilState} from 'recoil'
import {ResultDetailInfoState} from '../atoms/resultDetailInfo'

export default function useResultDetailInfo() {
  const setResultDetailInfo = useSetRecoilState(ResultDetailInfoState)
  const mutation = useMutation(resultDetailData, {
    onSuccess: data => {
      setResultDetailInfo(data)
    },
    onError: error => {
      console.log('err :', error)
    },
  })

  return mutation
}
