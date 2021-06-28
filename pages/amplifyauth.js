import { withAuthenticator } from '@aws-amplify/ui-react'
import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import '../configureAmplify'

const Profile = () => {
    const [user, setUser] = useState(null)
  
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

    return(
        <div>
            <p>Welcome, {user.attributes.email}</p>
        </div>
    )
  
}

export default withAuthenticator(Profile)