import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { useAuth } from './context/AuthProvider'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import NewPostScreen from './screens/NewPostScreen'
import RegisterScreen from './screens/RegisterScreen'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false,
}

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='HomeScreen'
        screenOptions={screenOptions}
      >
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='NewPostScreen' component={NewPostScreen} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export const SignedOutStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='LoginScreen'
        screenOptions={screenOptions}
      >
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export const MainNavigator = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth()
  const detectLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        setIsLoggedIn(true)
      } else setIsLoggedIn(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    detectLogin()
  }, [])
  return isLoggedIn ? <SignedInStack /> : <SignedOutStack />
}
