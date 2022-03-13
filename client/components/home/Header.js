import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://img.icons8.com/fluency-systems-regular/24/000000/like--v1.png',
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image
            source={{
              uri: 'https://img.icons8.com/fluency-systems-regular/48/000000/facebook-messenger.png',
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
    marginHorizontal: 20,
  },

  iconsContainer: {
    flexDirection: 'row',
  },

  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
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

export default Header
