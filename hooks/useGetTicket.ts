import {useMutation} from '@tanstack/react-query'
import {getticket} from '../api/mypage'
import {useSetRecoilState} from 'recoil'
import {PayInfoState} from '../atoms/payInfo'

export default function useGetTicket() {
  const setPayInfo = useSetRecoilState(PayInfoState)
  const mutation = useMutation(getticket, {
    onSuccess: data => {
      setPayInfo(data)
    },
    onError: error => {
      console.log('err :', error)
    },
  })

  return mutation
}
