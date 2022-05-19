import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfileHeader from '../components/Profile/ProfileHeader'
import User from '../components/Profile/User'

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader navigation={navigation} />
      <User />
      <ScrollView></ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
})

export default ProfileScreen
