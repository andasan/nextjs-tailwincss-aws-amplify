import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import '../configureAmplify'

const Profile = () => {
  useEffect(() => {
      const checkUser = async () => {
        const user = await Auth.currentAuthenticatedUser()
        console.log({ user });
      }
      checkUser()
  }, [])
  return (
    <div>
      <button onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>
        Sign in with Google
      </button>
      <button onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}>
        Sign in with Facebook
      </button>
    </div>
  )
}

export default Profile
