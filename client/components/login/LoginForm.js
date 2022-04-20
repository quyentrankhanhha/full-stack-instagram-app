import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import * as yup from 'yup'
import { loginApi } from '../../api/index'
import { useAuth } from '../../context/AuthProvider'

const LoginForm = ({ navigation }) => {
  const { setIsLoggedIn, setProfile } = useAuth()

  const LoginSchema = yup.object().shape({
    email: yup.string().email().required('An email is required'),
    password: yup
      .string()
      .required()
      .min(8, 'Your password has to have at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Your password has to have at least 1 uppercase, 1 lowercase, 1 number and 1 special case character'
      ),
  })

  const handleOnLogin = (values) => {
    axios({
      method: 'POST',
      url: loginApi,
      data: values,
    })
      .then((res) => {
        setIsLoggedIn(true)
        setProfile(res.data.user)
        navigation.push('HomeScreen')
      })
      .catch((err) => {
        if (err.response) {
          Alert.alert('Error', err.response.data.message, [{ text: 'OK' }], {
            cancelable: true,
          })
        }
        return err
      })
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleOnLogin}
        validationSchema={LoginSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
          touched,
        }) => (
          <>
            <View
              style={[
                styles.inputField,
                { borderColor: validationColor(touched.email, errors.email) },
              ]}
            >
              <TextInput
                placeholder='Email'
                placeholderTextColor='#444'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={errors.email}
                touched={touched.email}
              />
            </View>

            {errors.email && touched.email && (
              <View>
                <Text style={styles.errorText}>{errors.email}</Text>
              </View>
            )}

            <View
              style={[
                styles.inputField,
                {
                  borderColor: validationColor(
                    touched.password,
                    errors.password
                  ),
                },
              ]}
            >
              <TextInput
                placeholder='Password'
                placeholderTextColor='#444'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                textContentType='password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={errors.password}
                touched={touched.password}
              />
            </View>

            {errors.password && touched.password && (
              <View>
                <Text style={styles.errorText}>{errors.password}</Text>
              </View>
            )}

            <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
              <Text style={{ color: '#6BB0F5' }}>Forgot password?</Text>
            </View>

            <Pressable
              titleSize={20}
              style={customButton(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.push('RegisterScreen')}
              >
                <Text style={{ color: '#6BB0F5' }}>Register</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },

  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFAFA',
    borderWidth: 1,
    marginBottom: 6,
  },

  errorText: {
    fontSize: 10,
    color: 'red',
    padding: 6,
    marginBottom: 10,
  },

  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 20,
  },

  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
})

const customButton = (isValid) => ({
  backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 42,
  borderRadius: 4,
})

const validationColor = (touched, error) =>
  !touched ? '#223e4b' : error ? '#FF5A5F' : '#223e4b'
