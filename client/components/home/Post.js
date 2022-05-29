import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Divider } from 'react-native-elements'
import { PIC_URL } from '../../constant/api'
import { postFooterIcons } from '../../constant/postFooterIcons'
import { useAuth } from '../../context/AuthProvider'
import { base64ToDataUri } from '../../utils'

const Post = ({ post, deletePost, token }) => {
  const { user } = useAuth()

  const [isEdited, setIsEdited] = useState(false)
  const [caption, setCaption] = useState(post.caption)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(post.comments)

  const toggleEdit = () => setIsEdited(!isEdited)
  const captionOnChange = (text) => setCaption(text)
  const commentOnChange = (text) => {
    setComment(text)
  }

  const handleEditCaption = async () => {
    const data = {
      postId: post._id,
      caption,
    }
    await axios
      .put(PIC_URL + '/' + post._id, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toggleEdit()
      })
      .catch((err) => console.log(err))
  }

  const handleAddComment = async () => {
    const data = {
      postId: post._id,
      text: comment,
    }
    await axios
      .put(PIC_URL + '/comment', data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setComments([...comments, { text: comment, createdBy: post.createdBy }])
        setComment('')
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {}, [comment, comments])

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation='vertical' />
      <PostHeader
        post={post}
        user={user}
        deletePost={deletePost}
        toggleEdit={toggleEdit}
      />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter />
        <Likes />
        <Caption
          post={post}
          isEdited={isEdited}
          caption={caption}
          captionOnChange={captionOnChange}
          handleEditCaption={handleEditCaption}
        />
        {/* <CommentsSection post={post} navigation={navigation} /> */}
        {comments.length > 0 ? <Comments post={post} /> : <></>}
        <PostComment
          comment={comment}
          commentOnChange={commentOnChange}
          handleAddComment={handleAddComment}
        />
      </View>
    </View>
  )
}

const PostHeader = ({ post, user, deletePost, toggleEdit }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
      alignItems: 'center',
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNTphqAcgRRkbHdhcWofAsVBon_jYRBw_v9EKxjwprkdXkJ62I6lcSiB6JgUEPl4kDeo&usqp=CAU',
        }}
        style={styles.story}
      />
      <Text style={{ marginLeft: 5, fontWeight: '700' }}>
        {post.createdBy.username}
      </Text>
    </View>
    {user._id === post.createdBy._id && (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={toggleEdit}>
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
    )}
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
    <Text style={{ fontWeight: '600' }}>123 likes</Text>
  </View>
)

const Caption = ({
  post,
  handleEditCaption,
  isEdited,
  caption,
  captionOnChange,
}) => (
  <View style={{ marginTop: 5 }}>
    <Text>
      <Text style={{ fontWeight: '600' }}>
        {post?.createdBy?.username || 'Unknown'}{' '}
      </Text>
      {!isEdited ? (
        <Text>{post.caption}</Text>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          }}
        >
          <TextInput
            style={{ paddingBottom: 10, width: '90%' }}
            value={caption}
            onChangeText={captionOnChange}
            multiline
            editable
            maxLength={10}
          />
          <Button title='Done' onPress={handleEditCaption} />
        </View>
      )}
    </Text>
  </View>
)

const CommentsSection = ({ post, navigation }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text
        style={{ color: 'gray' }}
        onPress={() =>
          navigation.navigate('CommentScreen', {
            postId: post._id,
            user: createdBy,
          })
        }
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
            {comment?.createdBy?.username || 'Unknown'}
          </Text>{' '}
          {comment.text}
        </Text>
      </View>
    ))}
  </>
)

const PostComment = ({ comment, commentOnChange, handleAddComment }) => (
  <View style={styles.captionContainer}>
    <TextInput
      placeholder='Add a comment'
      value={comment}
      onChangeText={commentOnChange}
      multiline
      editable
      maxLength={10}
      style={styles.addCaptionInput}
    />
    <Button title='Post' onPress={handleAddComment} disabled={!comment} />
  </View>
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

  captionContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  addCaptionInput: {
    width: '90%',
    paddingBottom: 10,
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
