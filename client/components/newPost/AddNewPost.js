import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PostUploader from './PostUploader'

const AddNewPost = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <PostUploader navigation={navigation} />
    </View>
  )
}

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={{
          uri: 'https://img.icons8.com/ios-glyphs/48/000000/back.png',
        }}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>New Post</Text>
    <Text></Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    fontWeight: '700',
    fontSize: 20,
    marginRight: 22,
  },
})

export default AddNewPost
