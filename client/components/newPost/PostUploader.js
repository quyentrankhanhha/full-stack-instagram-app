import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Divider } from 'react-native-elements'
import * as yup from 'yup'
import { PIC_URL } from '../../constant/api'
import { usePosts } from '../../context/PostProvider'

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

const uploadPostSchema = yup.object().shape({
  caption: yup.string().max(2200, 'Caption has reached the character limit.'),
  image: yup.mixed().required(),
})

const PostUploader = ({ navigation }) => {
  const [hasGaleryPermission, setHasGalleryPermission] = useState(null)
  const [token, setToken] = useState('')
  const { postList, setPostList } = usePosts()

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

  if (hasGaleryPermission === null) {
    return <View />
  }
  if (hasGaleryPermission === false) {
    return <Text>No permission!</Text>
  }
  const options = {
    title: 'Select Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  }
  const pickImage = async (handleChange) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    })
    console.log(result)

    if (!result.cancelled) {
      handleChange(result.uri)
    }
  }

  const onSubmit = (values) => {
    axios
      .post(PIC_URL, values, {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'image/jpeg',
        },
      })
      .then((res) => {
        Alert.alert('You have shared successfully!', [{ text: 'OK' }])
        setPostList([...postList.post, res.data])
      })
      .catch((err) => {
        if (err.response) {
          Alert.alert('Error', err.response.data.message, [
            { text: 'Try again!' },
          ])
        }
        return Alert.alert('Error', err, [{ text: 'Try again!' }])
      })
    navigation.goBack()

    // navigation.navigate('Home', { img: values.image, caption: values.caption })
  }

  return (
    <Formik
      initialValues={{ caption: '', image: '' }}
      onSubmit={onSubmit}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({ handleBlur, handleChange, handleSubmit, values, errors }) => (
        <form>
          <View
            style={{
              margin: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            {values.image && values.image.length > 0 ? (
              <Image
                source={{
                  uri: values.image,
                }}
                style={{ width: 100, height: 100 }}
              />
            ) : (
              <TouchableOpacity
                title='Choose Image'
                name='image'
                onPress={() => pickImage(handleChange('image'))}
              >
                <Text>Upload Image</Text>
              </TouchableOpacity>
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
        </form>
      )}
    </Formik>
  )
}

export default PostUploader
