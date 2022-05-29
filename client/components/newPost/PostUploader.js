import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Image, Text, TextInput, View } from 'react-native'
import { Divider } from 'react-native-elements'
import * as yup from 'yup'
import { PIC_URL } from '../../constant/api'

const uploadPostSchema = yup.object().shape({
  caption: yup.string().max(2200, 'Caption has reached the character limit.'),
  imageBase64: yup.string().required(),
})

const PostUploader = ({ navigation }) => {
  const [hasGaleryPermission, setHasGalleryPermission] = useState(null)
  const [token, setToken] = useState('')
  const [image, setImage] = useState({})

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token')

      if (value !== null) {
        setToken(value)
      }
    } catch (e) {
      alert('Failed to fetch the input from storage')
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  useEffect(() => {
    ;(async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status === 'granted')
    })()
  }, [])

  const pickImage = async (handleChange) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 0,
      base64: true,
    })

    if (!result.cancelled) {
      handleChange(result.base64)
      setImage(result)
    }
  }

  const onSubmit = (values) => {
    axios
      .post(PIC_URL, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // Alert.alert('You have shared successfully!', [{ text: 'OK' }])
      })
      .catch((err) => {
        console.log(err)
        // if (err.response) {
        //   Alert.alert('Error', err.response.data.message, [
        //     { text: 'Try again!' },
        //   ])
        // }
        return Alert.alert('Error', err, [{ text: 'Try again!' }])
      })
    navigation.goBack()
  }

  if (hasGaleryPermission === null) {
    return <View />
  }
  if (hasGaleryPermission === false) {
    return <Text>No permission!</Text>
  }

  return (
    <Formik
      initialValues={{
        caption: '',
        imageBase64: '',
      }}
      onSubmit={onSubmit}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({ handleBlur, handleChange, handleSubmit, values, errors }) => (
        <View>
          <View
            style={{
              margin: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            {image.uri ? (
              <Image
                source={{
                  uri: image.uri,
                }}
                style={{ width: 100, height: 100 }}
                asdfsadf
              />
            ) : (
              <Button
                title='Choose Image'
                name='image'
                onPress={() => pickImage(handleChange('imageBase64'))}
              >
                <Text>Upload Image</Text>
              </Button>
            )}

            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                style={{ fontSize: 18 }}
                placeholder='Write a caption...'
                placeholderTextColor='gray'
                multiline={true}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation='vertical' />

          {errors.caption && (
            <Text style={{ fontSize: 10, color: 'red' }}>{errors.caption}</Text>
          )}

          <Button
            onPress={handleSubmit}
            title='Share'
            disabled={!values.image && !values.caption}
          />
        </View>
      )}
    </Formik>
  )
}

export default PostUploader
