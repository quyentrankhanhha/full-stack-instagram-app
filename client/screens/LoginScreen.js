import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import LoginForm from '../components/Login/LoginForm'

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={{ height: 100, width: 150 }}
        />
      </View>
      <LoginForm navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
})

export default LoginScreen
