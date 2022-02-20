import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-row h-full">
        <Sidebar />
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
