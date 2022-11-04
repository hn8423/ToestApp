import {
  useMutation,
} from '@tanstack/react-query'
import { register } from '../api/auth'

export default function useRegister(){
  const mutation = useMutation(register,{
    onSuccess:(data) => {
      console.log('success :',data)
    },
    onError:(error) => {
      console.log('err :',error)
    }
  })

  return mutation
}