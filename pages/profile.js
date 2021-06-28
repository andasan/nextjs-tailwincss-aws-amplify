import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import '../configureAmplify'

import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import ConfirmSignUp from '../components/ConfirmSignUp'
import ForgotPasswordSubmit from '../components/ForgotPasswordSubmit'
import ForgotPassword from '../components/ForgotPassword'

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
      }
    }
    checkUser()
  }, [])

  const onChange = (e) => {
    setFormState({ ...formstate, [e.target.name]: e.target.value })
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='flex flex-col items-center'>
        <div className='max-w-full sn:w-540 mt-14'>
          <div className='bg-white py-14 px-16 shadow-form rounded'>
            {uiState === 'signUp' && (
              <SignUp onChange={onChange} setUiState={setUiState} />
            )}
            {uiState === 'confirmSignUp' && (
              <ConfirmSignUp onChange={onChange} setUiState={setUiState} />
            )}
            {uiState === 'signIn' && (
              <SignIn onChange={onChange} setUiState={setUiState} />
            )}
            {uiState === 'signedIn' && (
              <div>
                <p className='text-x1'>Welcome, {user.attributes.email}</p>
                <button
                  className='text-white w-full mt-10 bg-pink-600 p-3 rounded'
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
            {uiState === 'forgotPassword' && (
              <ForgotPassword onChange={onChange} setUiState={setUiState}  />
            )}
            {uiState === 'forgotPasswordSubmit' && (
              <ForgotPasswordSubmit onChange={onChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
