import { Auth } from 'aws-amplify'

import SocialSignIn from './SocialSignin'
import Input from './Input'

export default function SignIn({ onChange, setUiState, signIn }) {
  return (
    <div>
      <p className='text-3xl font-black'>Sign in to your account</p>
      <div className='mt-10'>
        <label htmlFor='email' className='text-sm'>Email</label>
        <Input type='email' onChange={onChange} name="email" />
      </div>
      <div className='mt-10'>
        <label htmlFor='password' className='text-sm'>
            Password
            <span
                onClick={()=> setUiState('forgotPassword')}
                className="text-sm ml-8 sm:ml-44 cursor-pointer text-pink-500"
            >Forgot your password?</span>
        </label>
        <Input type='password' onChange={onChange} name="password" />
      </div>
      <button className="text-white w-full mt-6 bg-pink-600 p-3 rounded"> Sign In</button>
      
      <SocialSignIn />
      <p className='mt-12 test-sm font-light'>
          Don't have an account?
          <span
            onClick={() => setUiState('signUp')}
            role="button"
            className="cursor-pointer text-pink-600"
          > Sign Up
          </span>
      </p>
    </div>
  )
}
