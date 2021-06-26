import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import '../configureAmplify'

import SignIn from '../components/SignIn'

const initialState = { email: '', password: '', authCode: '' }

const Profile = () => {
  const [uiState, setUiState] = useState(null)
  const [formstate, setFormState] = useState(initialState)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        setUser(user)
        setUiState('signedIn')
      } catch (error) {
        setUser(null)
        setUiState('signIn')
        console.error(error.message)
      }
    }
    checkUser()
  }, [])

  const onChange = (e) => {
    setFormState({ ...formstate, [e.target.name]: e.target.value })
  }

  return (
    <>
      {uiState === 'signIn' && (
        <SignIn onChange={onChange} setUiState={setUiState} />
      )}
      {uiState === 'signedIn' && (
        <div>
          <p className="text-x1">Welcome, {user.attributes.email}</p>
          <button
            className="text-white w-full mt-10 bg-pink-600 p-3 rounded"
            onClick={() => {
              Auth.signOut()
              setUiState('signIn')
              setUser(null)
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  )
}

export default Profile
