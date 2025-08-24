import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from './src/screens/HomeScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ProductScreen from './src/screens/ProductScreen';
import LoginScreen from './src/screens/LoginScreen';

export type RootStackParamList = {
  Home: undefined;
  Categories: undefined;
  Category: { slug: string };
  Product: { id: string };
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#007AFF',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'EcommWeb' }}
            />
            <Stack.Screen 
              name="Categories" 
              component={CategoriesScreen} 
              options={{ title: 'Categories' }}
            />
            <Stack.Screen 
              name="Category" 
              component={CategoryScreen} 
              options={{ title: 'Category' }}
            />
            <Stack.Screen 
              name="Product" 
              component={ProductScreen} 
              options={{ title: 'Product' }}
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ title: 'Sign In' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
