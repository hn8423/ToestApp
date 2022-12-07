import {useMemo} from 'react'
import {StyleSheet} from 'react-native'

const useStyles2 = <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(
  style: T | StyleSheet.NamedStyles<T>,
) => {
  const styles = useMemo(() => StyleSheet.create(style), [style])
  const getStyles = useMemo(
    () =>
      new Proxy(styles, {
        get: <P extends typeof styles, K extends keyof P & string>(
          target: P,
          p: K,
        ): {style: P[K]} => {
          return {style: target[p]}
        },
      }),
    [styles],
  )

  return {
    styles,
    getStyles: getStyles as unknown as {[x in keyof T]: {style: T[x]}},
  }
}

export default useStyles2
