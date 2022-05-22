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
import { REGISTER_URL } from '../../constant/api'

const RegisterForm = ({ navigation }) => {
  const RegisterSchema = yup.object().shape({
    email: yup.string().email().required('An email is required'),
    username: yup.string().required().min(2, 'A username is required'),
    password: yup
      .string()
      .required()
      .min(8, 'Your password has to have at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Your password has to have at least 1 uppercase, 1 lowercase, 1 number and 1 special case character'
      ),
  })

  const handleOnRegister = (values) => {
    axios({
      method: 'POST',
      url: REGISTER_URL,
      data: values,
    })
      .then((res) => {
        Alert.alert(
          'Congrats',
          'You have successfully registered!',
          [{ text: 'OK', onPress: () => navigation.push('LoginScreen') }],
          {
            cancelable: true,
          }
        )
      })
      .catch((err) => {
        if (err.response) {
          Alert.alert(
            'Error',
            err.response.data.message,
            [{ text: 'Try again!' }],
            {
              cancelable: true,
            }
          )
        }
        return err
      })
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={handleOnRegister}
        validationSchema={RegisterSchema}
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
                    touched.username,
                    errors.username
                  ),
                },
              ]}
            >
              <TextInput
                placeholder='Username'
                placeholderTextColor='#444'
                autoCapitalize='none'
                textContentType='username'
                autoFocus={true}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
            </View>
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
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: '#6BB0F5' }}>Login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

export default RegisterForm

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
