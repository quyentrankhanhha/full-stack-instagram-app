import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomTabs from '../components/home/BottomTabs'
import ProfileHeader from '../components/profile/ProfileHeader'
import User from '../components/profile/User'
import { bottomTabIcons } from '../constant/bottomTabIcons'

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader navigation={navigation} />
      <User />
      <ScrollView></ScrollView>
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

export default ProfileScreen
