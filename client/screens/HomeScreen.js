import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import BottomTabs from '../components/home/BottomTabs'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import { bottomTabIcons } from '../constant/bottomTabIcons'
import { POSTS } from '../data/posts'

const HomeScreen = ({ navigation }) => {
  const logout = () => {
    AsyncStorage.removeItem('token').then(() => {
      navigation.push('LoginScreen')
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        {POSTS.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs navigation={navigation} icons={bottomTabIcons} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
})

export default HomeScreen
