import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import BottomTab from './components/BottomTab/BottomTab'
import { useAuth } from './context/AuthProvider'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import NewPostScreen from './screens/NewPostScreen'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false,
}

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name='MainScreen' component={BottomTab} />
        <Stack.Screen name='NewPostScreen' component={NewPostScreen} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
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
  const { isLoggedIn, setIsLoggedIn, setToken, setUser } = useAuth()
  const detectLogin = async () => {
    try {
      const localToken = await AsyncStorage.getItem('token')
      const localUser = await AsyncStorage.getItem('user')
      if (localToken && localUser) {
        setIsLoggedIn(true)
        setToken(localToken)
        setUser(JSON.parse(localUser))
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
