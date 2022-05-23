import { useIsFocused } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native'
import Header from '../components/Home/Header'
import Post from '../components/Home/Post'
import { usePosts } from '../context/PostProvider'

const HomeScreen = ({ navigation }) => {
  const { postList, getPostList } = usePosts()
  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      getPostList()
    }
  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        {!postList?.posts?.length && (
          <Text style={styles.text}>Nothing here!</Text>
        )}
        {postList?.posts?.map((post, index) => (
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
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    padding: 'auto',
  },
})

export default HomeScreen
