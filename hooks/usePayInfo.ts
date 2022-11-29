import {useMutation} from '@tanstack/react-query'
import {pay} from '../api/apply'
import {useSetRecoilState} from 'recoil'
import {PayInfoState} from '../atoms/payInfo'

export default function usePayInfo() {
  const setPayInfo = useSetRecoilState(PayInfoState)
  const mutation = useMutation(pay, {
    onSuccess: data => {
      setPayInfo(data)
    },
    onError: error => {
      console.log('err :', error)
    },
  })

  return mutation
}
