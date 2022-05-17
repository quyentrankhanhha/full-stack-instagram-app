import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const User = () => {
  return (
    <View style={styles.profileSectionWrapper}>
      <View style={styles.avatarSection}>
        <Image
          style={styles.avatar}
          source='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNTphqAcgRRkbHdhcWofAsVBon_jYRBw_v9EKxjwprkdXkJ62I6lcSiB6JgUEPl4kDeo&usqp=CAU'
        />
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

  infoUser: {
    display: 'flex',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})

export default User
