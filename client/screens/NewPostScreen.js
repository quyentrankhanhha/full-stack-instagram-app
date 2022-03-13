import React from 'react'
import { SafeAreaView } from 'react-native'
import AddNewPost from '../components/home/newPost/AddNewPost'

const NewPostScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AddNewPost />
    </SafeAreaView>
  )
}

export default NewPostScreen
