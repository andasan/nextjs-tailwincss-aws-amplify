import { Auth } from 'aws-amplify'

import Input from './Input'


export default function SignUp({ onChange, setUiState, signUp }) {
    return (
      <div>
        <p className='text-3xl font-black'>Sign up for an account</p>
        <div className='mt-10'>
          <label htmlFor='email' className='text-sm'>Email</label>
          <Input type='email' onChange={onChange} name="email" />
        </div>
        <div className='mt-10'>
          <label htmlFor='password' className='text-sm'>
              Password
          </label>
          <Input type='password' onChange={onChange} name="password" />
        </div>
        <button 
            onClick={signUp}
            className="text-white w-full mt-6 bg-pink-600 p-3 rounded"
        > Sign Up</button>
        
        <p className='mt-12 test-sm font-light'>
            Have an account?
            <span
              onClick={() => setUiState('signIn')}
              role="button"
              className="cursor-pointer text-pink-600"
            > Sign In
            </span>
        </p>
      </div>
    )
  }