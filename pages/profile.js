import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import '../configureAmplify'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
  const { email, password, authCode } = formstate

  useEffect(() => {
    checkUser()
    console.log(user)
  }, [])

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

  const onChange = (e) => {
    setFormState({ ...formstate, [e.target.name]: e.target.value })
  }

  const toastError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  const signUp = async () => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      })
      setUiState('confirmSignUp')
    } catch (error) {
      // console.log({ error })
      toastError(error.message)
    }
  }
  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(email, authCode)
      setUiState('signedIn')
      signIn()
    } catch (error) {
      // console.log({ error })
      toastError(error.message)
    }
  }
  const signIn = async () => {
    try {
      await Auth.signIn(email, password)
      setUiState('signedIn')
      checkUser()
    } catch (error) {
      // console.log({ error })
      toastError(error.message)
    }
  }
  const forgotPassword = async () => {
    try {
      await Auth.forgotPassword(email)
      setUiState('forgotPasswordSubmit')
    } catch (error) {
      // console.log({ error })
      toastError(error.message)
    }
  }
  const forgotPasswordSubmit = async () => {
    try {
      await Auth.forgotPasswordSubmit(email, authCode, password)
      // setUiState('signIn')
      signIn() //auto sign in
    } catch (error) {
      // console.log({ error })
      toastError(error.message)
    }
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='flex flex-col items-center'>
        <div className='max-w-full sn:w-540 mt-14'>
          <div className='bg-white py-14 px-16 shadow-form rounded'>
            {uiState === 'signUp' && (
              <SignUp
                onChange={onChange}
                setUiState={setUiState}
                signUp={signUp}
              />
            )}
            {uiState === 'confirmSignUp' && (
              <ConfirmSignUp
                onChange={onChange}
                setUiState={setUiState}
                confirmSignUp={confirmSignUp}
              />
            )}
            {uiState === 'signIn' && (
              <SignIn
                onChange={onChange}
                setUiState={setUiState}
                signIn={signIn}
              />
            )}
            {uiState === 'signedIn' && user && (
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
              <ForgotPassword
                onChange={onChange}
                setUiState={setUiState}
                forgotPassword={forgotPassword}
              />
            )}
            {uiState === 'forgotPasswordSubmit' && (
              <ForgotPasswordSubmit
                onChange={onChange}
                forgotPasswordSubmit={forgotPasswordSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
