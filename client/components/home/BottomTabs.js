import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState('Home')

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
        style={[
          styles.icon,
          icon.name === 'Profile' ? styles.profilePic() : null,
          activeTab === 'Profile' && icon.name === activeTab
            ? styles.profilePic(activeTab)
            : null,
        ]}
      />
    </TouchableOpacity>
  )
  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation='vertical' />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  )
}

export const bottomTabIcons = [
  {
    name: 'Home',
    active: 'https://img.icons8.com/ios-filled/48/000000/home.png',
    inactive: 'https://img.icons8.com/ios/48/000000/home--v1.png',
  },
  {
    name: 'Search',
    active: 'https://img.icons8.com/ios-filled/48/000000/search--v1.png',
    inactive:
      'https://img.icons8.com/fluency-systems-regular/48/000000/search--v1.png',
  },
  {
    name: 'Reels',
    active: 'https://img.icons8.com/ios-filled/48/000000/circled-play.png',
    inactive:
      'https://img.icons8.com/fluency-systems-regular/48/000000/circled-play--v1.png',
  },
  {
    name: 'Profile',
    active:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNTphqAcgRRkbHdhcWofAsVBon_jYRBw_v9EKxjwprkdXkJ62I6lcSiB6JgUEPl4kDeo&usqp=CAU',
    inactive:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNTphqAcgRRkbHdhcWofAsVBon_jYRBw_v9EKxjwprkdXkJ62I6lcSiB6JgUEPl4kDeo&usqp=CAU',
  },
]

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    bottom: '3%',
    zIndex: 999,
    backgroundColor: '#fff',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    paddingTop: 10,
  },

  icon: {
    width: 30,
    height: 30,
  },

  profilePic: (activeTab = '') => ({
    borderRadius: 50,
    borderWidth: activeTab === 'Profile' ? 2 : 0,
    borderColor: '#fff',
  }),
})

export default BottomTabs
