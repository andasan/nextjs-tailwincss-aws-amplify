import { Auth } from 'aws-amplify'

import Input from './Input'

export default function ConfirmSignUp({ onChange, setUiState, confirmSignUp }) {
  return (
    <div>
      <p className='text-3xl font-black'>Confirm your account</p>
      <div className='mt-10'>
        <label htmlFor='authCode' className='text-sm'>
          Confrimation Code
        </label>
        <Input type='email' onChange={onChange} name='authCode' />
      </div>

      <button
        onClick={confirmSignUp}
        className='text-white w-full mt-6 bg-pink-600 p-3 rounded'
      >Confirm Sign Up
      </button>

      <button
        onClick={() => setUiState('signIn')}
        className='text-sm mt-6 text-pink-600'
      >Cancel
      </button>
    </div>
  )
}
