import AsyncStorage from '@react-native-async-storage/async-storage'
import {AuthStateParams} from '../atoms/auth'

const key = 'auth'

const authStorage = {
  async get() {
    const rawData = await AsyncStorage.getItem(key)
    if (!rawData) {
      return null
    }
    try {
      const data: AuthStateParams = JSON.parse(rawData)
      return data
    } catch (e) {
      return null
    }
  },
  set(AuthStateParams: AuthStateParams) {
    return AsyncStorage.setItem(key, JSON.stringify(AuthStateParams))
  },
  clear() {
    return AsyncStorage.removeItem(key)
  },
}

export default authStorage
