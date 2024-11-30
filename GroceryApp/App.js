import React from 'react';
import AppNavigator from './app/navigation/AppNavigator';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

// Only define the local App function
export default function App() {
  return <AppNavigator />;
}

AppRegistry.registerComponent(appName, () => App);