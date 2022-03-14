import React, { useEffect, useState } from 'react'
import { SignedInStack, SignedOutStack } from './navigation'

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null)

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null)
  useEffect(() => {}, [])
  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>
}

export default AuthNavigation
