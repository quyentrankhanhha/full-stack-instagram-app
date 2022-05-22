import AuthProvider from './context/AuthProvider'
import PostProvider from './context/PostProvider'
import { MainNavigator } from './navigation'

export default function App() {
  return (
    <PostProvider>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </PostProvider>
  )
}
