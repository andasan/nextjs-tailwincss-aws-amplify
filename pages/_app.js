import '../styles/globals.css'
import Link from 'next/link'
import NextNprogress from 'nextjs-progressbar'

const MyApp = ({ Component, pageProps }) => (
  <div>
    <nav className='py-4 px-12 border-b border-gray-300'>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/profile'>
        <a className='ml-4'>Profile</a>
      </Link>
      <Link href='/protected'>
        <a className='ml-4'>Protected</a>
      </Link>
    </nav>
    <NextNprogress
      color='#dc2878'
      startPosition={0.3}
      stopDelayMs={200}
      height={5}
      showOnShallow={true}
    />
    <Component {...pageProps} />
  </div>
)

export default MyApp
