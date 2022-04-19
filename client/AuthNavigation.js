import React, { useEffect, useState } from 'react'
import { SignedOutStack } from './navigation'

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null)

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null)
  useEffect(() => {}, [])
  // return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>
  return <SignedOutStack></SignedOutStack>
}

export default AuthNavigation
