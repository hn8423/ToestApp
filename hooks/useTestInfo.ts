import {useMutation} from '@tanstack/react-query'
import {detail} from '../api/apply'
import {useSetRecoilState} from 'recoil'
import {TestInfoState} from '../atoms/testInfo'

export default function useTestInfo() {
  const setTestInfo = useSetRecoilState(TestInfoState)
  const mutation = useMutation(detail, {
    onSuccess: data => {
      setTestInfo(data)
    },
    onError: error => {
      console.log('err :', error)
    },
  })

  return mutation
}
