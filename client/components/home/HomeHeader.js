import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../context/AuthProvider'

const HomeHeader = ({ navigation }) => {
  const { setIsLoggedIn } = useAuth()

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={{
            uri: 'https://img.icons8.com/ios/50/000000/camera--v1.png',
          }}
          style={styles.cameraIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
          <Image
            source={{
              uri: 'https://img.icons8.com/fluency-systems-regular/50/000000/plus-2-math.png',
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.clear()
            setIsLoggedIn(false)
            navigation.navigate('LoginScreen')
          }}
        >
          {/* <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View> */}
          <Image
            source={{
              uri: 'https://img.icons8.com/ios/50/000000/menu-2.png',
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },

  iconsContainer: {
    flexDirection: 'row',
  },

  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },

  cameraIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 0,
    paddingLeft: 0,
  },

  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: 'contain',
  },

  unreadBadge: {
    backgroundColor: '#FF3250',
    position: 'absolute',
    left: 25,
    bottom: 18,
    width: 20,
    height: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },

  unreadBadgeText: {
    color: 'white',
    fontWeight: '600',
  },
})

export default HomeHeader
