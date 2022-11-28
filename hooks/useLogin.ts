import {useMutation} from '@tanstack/react-query'
import {login} from '../api/auth'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import {AuthState} from '../atoms/auth'
import {langState} from '../atoms/lang'
import {Alert, Platform, ToastAndroid} from 'react-native'
import {LangMap2} from '../type'
import {useState} from 'react'
import {TabActions, useNavigation} from '@react-navigation/native'
import useGetTicket from './useGetTicket'

export default function useLogin() {
  const navigation = useNavigation()
  const setAuth = useSetRecoilState(AuthState)
  const lang = useRecoilValue(langState)
  const {mutate: getTicketMutate} = useGetTicket()

  const [globalText] = useState<LangMap2>({
    en: {
      title: 'login err',
      message: 'account or password is not valid.',
    },
    ko: {
      title: '로그인 오류',
      message: '계정 또는 비밀번호가 옳바르지 않습니다.',
    },
  })
  const mutation = useMutation(login, {
    onSuccess: data => {
      if (data.length === 0 || data.err) {
      } else {
        setAuth(data)
        navigation.dispatch(TabActions.jumpTo('Main'))
      }
    },
    onError: error => {
      console.log('err :', error)
    },
  })

  return mutation
}
