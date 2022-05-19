import * as ImagePicker from 'expo-image-picker'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Image, Text, TextInput, View } from 'react-native'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import * as yup from 'yup'

const uploadPostSchema = yup.object().shape({
  caption: yup.string().max(2200, 'Caption has reached the character limit.'),
  imageUrl: yup.mixed().required(),
})

const PostUploader = ({ navigation }) => {
  const [img, setImg] = useState(null)
  const [hasGaleryPermission, setHasGalleryPermission] = useState(null)

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.cancelled) {
      setImg(result.uri)
    }
  }

  return (
    <Formik
      initialValues={{ caption: '', imageUrl: '' }}
      onSubmit={(values) => {
        console.log(values)
        navigation.goBack()
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({ handleBlur, handleChange, handleSubmit, values, errors }) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            {img ? (
              <Image
                source={{
                  uri: validUrl.isUri(img),
                }}
                style={{ width: 100, height: 100 }}
              />
            ) : (
              <Button title='Choose Image' onPress={() => pickImage()} />
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

          {/* <TextInput
            onChange={(e) => setThumnailUrl(e.nativeEvent.text)}
            style={{ fontSize: 18 }}
            placeholder='Enter Image Url'
            placeholderTextColor='gray'
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          /> */}

          {errors.caption && (
            <Text style={{ fontSize: 10, color: 'red' }}>{errors.caption}</Text>
          )}

          <Button
            onPress={handleSubmit}
            title='Share'
            disabled={!img && !values.caption}
          />
        </>
      )}
    </Formik>
  )
}

export default PostUploader
