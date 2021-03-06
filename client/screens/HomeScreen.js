import { useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native'
import HomeHeader from '../components/home/HomeHeader'
import Post from '../components/home/Post'
import { PIC_URL } from '../constant/api'
import { useAuth } from '../context/AuthProvider'
import { usePosts } from '../context/PostProvider'

const HomeScreen = ({ navigation }) => {
  const { postList, getPostList, setPostList } = usePosts()
  const isFocused = useIsFocused()
  const { token } = useAuth()

  useEffect(() => {
    if (isFocused) {
      getPostList()
    }
  }, [isFocused])

  const deletePost = async (postId) => {
    await axios
      .delete(PIC_URL + '/' + postId, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          postId,
        },
      })
      .then((res) => {
        setPostList(postList.posts.filter((item) => item._id !== postId))
      })
      .catch((err) => console.log(err))
  }

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader navigation={navigation} />
      <ScrollView>
        {!postList?.posts?.length && (
          <Text style={styles.text}>Nothing here!</Text>
        )}
        {postList?.posts?.map((post, index) => (
          <Post
            token={token}
            post={post}
            key={index}
            navigation={navigation}
            deletePost={deletePost}
          />
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
