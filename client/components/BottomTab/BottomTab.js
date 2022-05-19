import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FavoriteScreen from '../../screens/FavoriteScreen'
import HomeScreen from '../../screens/HomeScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import SearchScreen from '../../screens/SearchScreen'

const Tab = createMaterialBottomTabNavigator()

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      labeled={false}
      activeColor='#2f3640'
      inactiveColor='#747d8c'
      barStyle={{ backgroundColor: '#f5f6fa' }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' size={26} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='magnify' size={26} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name='Favorite'
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='heart' size={26} color={color} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-circle'
              size={26}
              color={color}
            />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  )
}

export default BottomTab
