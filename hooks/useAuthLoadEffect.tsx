import {useEffect} from 'react'
import {useRecoilState} from 'recoil'
import {AuthState} from '../atoms/auth'
import authStorage from '../storages/authStorage'

export default function useAuthLoadEffect() {
  const [, setUser] = useRecoilState(AuthState)

  useEffect(() => {
    const fn = async () => {
      const auth = await authStorage.get()
      if (!auth) {
        return
      }
      setUser(auth)
    }
    fn()
  }, [setUser])
}
