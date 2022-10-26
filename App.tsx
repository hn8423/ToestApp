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
import BottomTabNavigator from './navigation/TabNavigator';
import { SafeAreaProvider } from "react-native-safe-area-context";


const App = () => {

  return (    
   <SafeAreaProvider>
     <NavigationContainer>
       <DrawerNavigator />
     </NavigationContainer>
   </SafeAreaProvider>


    );
};



export default App;
