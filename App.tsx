/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useMemo, useRef, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import DrawerNavigator from './navigation/DrawerNavigator'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {RecoilRoot} from 'recoil'
import {KeyboardAvoidingView, Platform} from 'react-native'
import useGetStyle from './hooks/use-style'
import WebView from 'react-native-webview'
import webViewCtx from './webViewContext'
import baseURL from './api/baseURL'
import SplashScreen from 'react-native-splash-screen'

const queryClient = new QueryClient()

const WebViewPropvider = webViewCtx.Provider

const App = () => {
  useEffect(() => {
    setTimeout(SplashScreen.hide, 1500)
  }, [])
  const [isVisible, setVisible] = useState(false)
  const style = useGetStyle({
    avoid: {
      flex: 1,
    },
    web: {
      display: isVisible ? 'flex' : 'none',
    },
  })
  const [uri, setUri] = useState('/mobile/signin')
  const webRef = useRef<WebView>(null)
  const web = useMemo(
    () => (
      <WebView
        ref={webRef}
        source={{uri: uri, baseUrl: baseURL}}
        {...style.web}
      />
    ),
    [style.web, uri],
  )

  return (
    <RecoilRoot>
      <WebViewPropvider
        value={{ref: webRef, WebViewComponent: web, setUri, setVisible}}
      >
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding', android: undefined})}
              {...style.avoid}
            >
              <NavigationContainer>
                <DrawerNavigator />
              </NavigationContainer>
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </QueryClientProvider>
      </WebViewPropvider>
    </RecoilRoot>
  )
}

export default App
