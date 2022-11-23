import {useMutation} from '@tanstack/react-query'
import {testSimpleData} from '../api/testSimpleData'
import {useSetRecoilState} from 'recoil'
import {TestSimpleDataState} from '../atoms/testSimpleData'

export default function useTestSimpleData() {
  const setTestSimpleData = useSetRecoilState(TestSimpleDataState)
  const mutation = useMutation(testSimpleData, {
    onSuccess: data => {
      setTestSimpleData(data)
    },
    onError: error => {
      console.log('err :', error)
    },
  })

  return mutation
}
