import { Formik } from 'formik'
import React, { useState } from 'react'
import { Button, Image, Text, TextInput, View } from 'react-native'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import * as yup from 'yup'

const PLACEHOLDER_IMG =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfQnp-XtDoYgXRsXKd9IFhY_HeWS_V3KhnZw&usqp=CAU'

const uploadPostSchema = yup.object().shape({
  imageUrl: yup.string().url().required('A URL is required'),
  caption: yup.string().max(2200, 'Caption has reached the character limit.'),
})

const PostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumnailUrl] = useState(PLACEHOLDER_IMG)
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
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : PLACEHOLDER_IMG,
              }}
              style={{ width: 100, height: 100 }}
            />
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
          <TextInput
            onChange={(e) => setThumnailUrl(e.nativeEvent.text)}
            style={{ fontSize: 18 }}
            placeholder='Enter Image Url'
            placeholderTextColor='gray'
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />

          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: 'red' }}>
              {errors.imageUrl}
            </Text>
          )}

          <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
        </>
      )}
    </Formik>
  )
}

export default PostUploader
