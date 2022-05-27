import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { postFooterIcons } from '../../constant/postFooterIcons'
import { base64ToDataUri } from '../../utils'

const Post = ({ post, navigation, deletePost }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation='vertical' />
      <PostHeader post={post} deletePost={deletePost} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter />
        <Likes />
        <Caption post={post} />
        <CommentsSection post={post} navigation={navigation} />
        {post.comments.length > 0 ? <Comments post={post} /> : <></>}
      </View>
    </View>
  )
}

const PostHeader = ({ post, deletePost }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
      alignItems: 'center',
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={{ uri: post.userImg }} style={styles.story} />
      <Text style={{ marginLeft: 5, fontWeight: '700' }}>
        {post.createdBy.username}
      </Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity>
        <Image
          source={{
            uri: 'https://img.icons8.com/external-flat-icons-inmotus-design/67/000000/external-dots-internet-messenger-flat-icons-inmotus-design.png',
          }}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deletePost(post._id)}>
        <Image
          source={{
            uri: 'https://img.icons8.com/material-outlined/24/000000/trash--v1.png',
          }}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  </View>
)

const PostImage = ({ post }) => {
  return (
    <View style={{ width: '100%', height: 450 }}>
      <Image
        source={{
          uri: base64ToDataUri(post?.photo),
        }}
        style={{ height: '100%', resizeMode: 'cover' }}
      />
    </View>
  )
}

const PostFooter = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={styles.leftFooterIconsContainer}>
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[0].imageUrl}
        />
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[1].imageUrl}
        />
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[2].imageUrl}
        />
      </View>

      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[3].imageUrl}
        />
      </View>
    </View>
  )
}

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }}></Image>
  </TouchableOpacity>
)

const Likes = ({ post }) => (
  <View style={{ flexDirection: 'row', marginTop: 4 }}>
    <Text style={{ fontWeight: '600' }}>
      123 likes
      {/* {post.likes.toLocaleString('en')} likes */}
    </Text>
  </View>
)

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text>
      <Text style={{ fontWeight: '600' }}>
        {post?.createdBy?.username || 'Unknown'}
      </Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
)

const CommentsSection = ({ post, navigation }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text
        style={{ color: 'gray' }}
        onPress={() => navigation.navigate('CommentScreen')}
      >
        View {post.comments.length > 2 ? 'all' : ''}
        {post.comments.length}{' '}
        {post.comments.length > 1 ? 'comments' : 'comment'}
      </Text>
    )}
  </View>
)

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: 'row', marginTop: 3 }}>
        <Text>
          <Text style={{ fontWeight: '600' }}>
            {comment.createdBy.username}
          </Text>{' '}
          {comment.text}
        </Text>
      </View>
    ))}
  </>
)

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#FF8501',
  },

  footerIcon: {
    width: 33,
    height: 33,
  },

  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
    resizeMode: 'contain',
  },

  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
})

export default Post
