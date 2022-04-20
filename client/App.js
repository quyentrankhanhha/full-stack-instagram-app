import axios from 'axios'
import { useEffect } from 'react'
import AuthProvider from './context/AuthProvider'
import { MainNavigator } from './navigation'

export default function App() {
  const fetchApi = async () => {
    const res = await axios.get('http://localhost:8000/api/pic')
    console.log(res.data)
  }

  useEffect(() => {
    fetchApi()
  }, [])
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  )
}
