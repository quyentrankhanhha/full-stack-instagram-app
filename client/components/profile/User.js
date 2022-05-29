import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useAuth } from '../../context/AuthProvider'
import { usePosts } from '../../context/PostProvider'
import { base64ToDataUri } from '../../utils'

const User = () => {
  const { user } = useAuth()
  const { postList } = usePosts()

  const userPost = postList.posts.filter(
    (post) => post.createdBy._id === user._id
  )

  return (
    <ScrollView>
      <View style={styles.profileSectionWrapper}>
        <View style={styles.avatarSection}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNTphqAcgRRkbHdhcWofAsVBon_jYRBw_v9EKxjwprkdXkJ62I6lcSiB6JgUEPl4kDeo&usqp=CAU',
            }}
          />
          <Text style={styles.name}>{user.username}</Text>
        </View>

        <View style={styles.infoUser}>
          <View>
            <Text>123</Text>
            <Text>Post</Text>
          </View>
          <View>
            <Text>123</Text>
            <Text>Followers</Text>
          </View>
          <View>
            <Text>123</Text>
            <Text>Followings</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          title='Edit Profile'
          accessibilityLabel='Edit Profile'
          style={styles.editButtonWrapper}
        >
          <Text style={styles.editTitle}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imgWrapper}>
        {userPost.map((post, index) => (
          <Image
            key={index}
            style={styles.galleryImg}
            source={{ uri: base64ToDataUri(post?.photo) }}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  profileSectionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarSection: {
    display: 'flex',
    flex: 1,
  },

  avatar: {
    width: 135,
    height: 135,
    borderRadius: 70,
    margin: 13,
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },

  infoUser: {
    display: 'flex',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  buttonWrapper: {
    width: '100%',
    margin: 10,
  },

  editButtonWrapper: {
    borderRadius: 5,
    borderWidth: 2,
    width: '95%',
    padding: 4,
  },

  editTitle: {
    fontWeight: '700',
    textAlign: 'center',
  },

  imgWrapper: {
    flexDirection: 'row',
  },

  galleryImg: {
    display: 'flex',
    flex: 1,
    height: 200,
    margin: 1,
  },
})

export default User
