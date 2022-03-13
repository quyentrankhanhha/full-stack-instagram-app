import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-elements'

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation='vertical' />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  )
}

const PostHeader = ({ post }) => (
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
      <Text style={{ marginLeft: 5, fontWeight: '700' }}>{post.user}</Text>
    </View>

    <Text style={{ fontWeight: '900' }}>...</Text>
  </View>
)

const PostImage = ({ post }) => {
  return (
    <View style={{ width: '100%', height: 450 }}>
      <Image
        source={{ uri: post.imgUrl }}
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
      {post.likes.toLocaleString('en')} likes
    </Text>
  </View>
)

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text>
      <Text style={{ fontWeight: '600' }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
)

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: 'gray' }}>
        View {post.comments.length > 1 ? 'all' : ''} {post.comments.length}{' '}
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
          <Text style={{ fontWeight: '600' }}>{comment.user}</Text>{' '}
          {comment.comment}
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

  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
})

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: 'https://img.icons8.com/ios/24/000000/like--v1.png',
    likedImageUrl: 'https://img.icons8.com/ios/24/000000/like--v1.png',
  },
  {
    name: 'Comment',
    imageUrl: 'https://img.icons8.com/ios/32/000000/speech-bubble--v1.png',
  },
  {
    name: 'Share',
    imageUrl: 'https://img.icons8.com/ios/50/000000/sent.png',
  },
  {
    name: 'Save',
    imageUrl:
      'https://img.icons8.com/fluency-systems-regular/48/000000/bookmark-ribbon--v1.png',
    savedImageUrl:
      'https://img.icons8.com/ios-glyphs/48/000000/bookmark-ribbon.png',
  },
]

export default Post
