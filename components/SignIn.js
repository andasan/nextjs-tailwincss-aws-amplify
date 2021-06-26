import { Auth } from 'aws-amplify'

export default function SignIn() {
  return (
    <div>
      <button onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>
        Sign in with Google
      </button>
      <button onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}>
        Sign in with Facebook
      </button>
      {/* <button onClick={() => Auth.signOut()}>Signout</button> */}
    </div>
  )
}
