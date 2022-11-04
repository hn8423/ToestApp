import {
  useMutation,
} from '@tanstack/react-query'
import { login } from '../api/auth'

export default function useLogin(){
  const mutation = useMutation(login,{
    onSuccess:(data) => {
      console.log('success :',data)
    },
    onError:(error) => {
      console.log('err :',error)
    }
  })

  return mutation
}