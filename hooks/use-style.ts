import { useMemo } from 'react'
import { StyleSheet } from 'react-native'

const useGetStyleTest = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  styles: T | StyleSheet.NamedStyles<T>
): { [x in keyof T]: { style: T[x] } } => {
  const style = useMemo(() => StyleSheet.create(styles), [styles])
  const getStyle = useMemo(
    () =>
      new Proxy(style, {
        get: <P extends typeof style, K extends keyof P & string>(target: P, p: K): { style: P[K] } => {
          return { style: target[p] }
        },
      }),
    [style]
  )

  return getStyle as unknown as { [x in keyof T]: { style: T[x] } }
}

export default useGetStyleTest