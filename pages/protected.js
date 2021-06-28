import { Auth } from 'aws-amplify'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Protected() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      setUser(user)
    } catch (error) {
      setUser(null)
      router.push('/profile')
    }
  }

  if (!user) return null

  return (
    <div>
      <p>Protected route</p>
    </div>
  )
}
