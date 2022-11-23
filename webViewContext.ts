import React, {RefObject} from 'react'
import WebView from 'react-native-webview'

const webViewCtx = React.createContext<{
  ref?: RefObject<WebView>
  WebViewComponent?: JSX.Element
  setUri: React.Dispatch<React.SetStateAction<string>>
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}>({setUri: () => {}, setVisible: () => {}})

webViewCtx.displayName = 'webview-context'

export default webViewCtx
