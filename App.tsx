/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient()

const App = () => {

  return (    
   <RecoilRoot>
      <QueryClientProvider client={queryClient}>
    <SafeAreaProvider>
       <NavigationContainer>
         <DrawerNavigator />
       </NavigationContainer>
    </SafeAreaProvider>
      </QueryClientProvider>
   </RecoilRoot>
    );
};



export default App;
