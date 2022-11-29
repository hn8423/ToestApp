import {useMutation} from '@tanstack/react-query'
import {registerTestList} from '../api/test'
import {useSetRecoilState} from 'recoil'
import {RegisterTestInfoState} from '../atoms/registertesInfo'

export default function useRegisterTestList() {
  const setRegisterTestInfo = useSetRecoilState(RegisterTestInfoState)
  const mutation = useMutation(registerTestList, {
    onSuccess: data => {
      if (data.err) {
        return
      }
      setRegisterTestInfo(data)
    },
    onError: error => {
      console.log('err :', error)
    },
  })

  return mutation
}
