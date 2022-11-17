import {useMutation} from '@tanstack/react-query'
import {login} from '../api/auth'
import {useRecoilState, useSetRecoilState} from 'recoil'
import {AuthState} from '../atoms/auth'

export default function useLogin() {
  const setAuth = useSetRecoilState(AuthState)
  const mutation = useMutation(login, {
    onSuccess: data => {
      console.log(data)
      setAuth(data)
    },
    onError: error => {
      console.log('err :', error)
    },
  })

  return mutation
}
