import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { PIC_URL } from '../constant/api'

const PostContext = createContext()

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])

  useEffect(async () => {
    await axios
      .get(PIC_URL)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  )
}

export const usePosts = () => useContext(PostContext)

export default PostProvider
