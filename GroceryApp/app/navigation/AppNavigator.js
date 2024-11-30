import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import AddItemScreen from '../screens/AddItemScreen';
import InventoryScreen from '../screens/InventoryScreen.js';
import MealPlanningScreen from '../screens/MealPlanningScreen.js';
import SignUpScreen from '../screens/SignUpScreen.js';
import LoginScreen from '../screens/LoginScreen.js';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* Stack Navigator */}
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#006A4E', // Set the navbar color to olive green
          },
          headerTintColor: '#fff', // Set the text color to white
          headerTitleStyle: {
            fontWeight: 'bold', // Make the screen name bold
          },
        }}
      >
        {/* Screen Definitions */}
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Shopping List" component={ShoppingListScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="Meal Planning" component={MealPlanningScreen} />
        <Stack.Screen name="AddItemScreen" component={AddItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>  );
}
