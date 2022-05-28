import React, { useState } from 'react'
import { Text, View } from 'react-native'

const CommentScreen = ({ navigation, route }) => {
  console.log(route)
  const [comments, setComments] = useState([])
  const [postId, setPostId] = useState('')
  const [text, setText] = useState('')

  return (
    <View>
      <Text>CommentScreen</Text>
    </View>
  )
}

export default CommentScreen
