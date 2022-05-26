import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { PIC_URL } from '../constant/api'

const PostContext = createContext()

const PostProvider = ({ children }) => {
  const [postList, setPostList] = useState([])

  const getPostList = () => {
    axios
      .get(PIC_URL)
      .then((res) => setPostList(res.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getPostList()
  }, [])

  return (
    <PostContext.Provider value={{ postList, setPostList, getPostList }}>
      {children}
    </PostContext.Provider>
  )
}

export const usePosts = () => useContext(PostContext)

export default PostProvider
