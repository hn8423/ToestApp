import {useMutation} from '@tanstack/react-query'
import {pay} from '../api/apply'
import {resultData} from '../api/resultData'
import {useSetRecoilState} from 'recoil'
import {ResultInfoState} from '../atoms/resultInfo'

export default function useResultInfo() {
  const setResultInfo = useSetRecoilState(ResultInfoState)
  const mutation = useMutation(resultData, {
    onSuccess: data => {
      setResultInfo(data)
    },
    onError: error => {
      console.log('err :', error)
    },
  })

  return mutation
}
