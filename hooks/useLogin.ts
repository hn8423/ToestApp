import {
  useMutation,
} from '@tanstack/react-query'
import { login } from '../api/auth'
import {useRecoilState} from 'recoil'
import { AuthState } from '../atoms/auth'

export default function useLogin(){
  const [auth,setAuth] = useRecoilState(AuthState)
  const mutation = useMutation(login,{
    onSuccess:(data) => {
      setAuth(data)
    },
    onError:(error) => {
      console.log('err :',error)
    }
  })

  return mutation
}