import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import RegisterForm from '../components/register/RegisterForm'

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={{ height: 100, width: 150 }}
        />
      </View>
      <RegisterForm navigation={navigation} />
    </View>
  )
}

export default RegisterScreen

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
