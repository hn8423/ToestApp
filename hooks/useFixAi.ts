import {useMutation} from '@tanstack/react-query'
import {fixAiRecommendation} from '../api/resultDetailData'
export default function useFixAi() {
  const mutation = useMutation(fixAiRecommendation, {
    onSuccess: data => {},
    onError: error => {
      console.log('err :', error)
    },
  })

  return mutation
}
