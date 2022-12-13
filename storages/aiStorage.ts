import AsyncStorage from '@react-native-async-storage/async-storage'
import {AiStateParams} from '../atoms/aiRecomend'

const key = 'ai'

const aiStorage = {
  async get() {
    const rawData = await AsyncStorage.getItem(key)
    if (!rawData) {
      return null
    }
    try {
      const data: AiStateParams = JSON.parse(rawData)
      return data
    } catch (e) {
      return null
    }
  },
  set(AiState: AiStateParams) {
    return AsyncStorage.setItem(key, JSON.stringify(AiState))
  },
  clear() {
    return AsyncStorage.removeItem(key)
  },
}

export default aiStorage
