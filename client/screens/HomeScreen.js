import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import Header from '../components/Home/Header'
import Post from '../components/Home/Post'
import { usePosts } from '../context/PostProvider'
import { POSTS } from '../data/posts'

const HomeScreen = ({ navigation }) => {
  const { posts } = usePosts()
  console.log(posts)

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        {POSTS.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
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
