import Header from '../components/Header'
import Sidebar from '../components/Sidebar/Index'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="h-screen flex flex-row bg-gray-800">
      
      <Sidebar />
      <div className="flex flex-col h-full w-full ">
      <Header />
      {/* Allows having that sweet rounded corner */}
        <div className="w-full h-full rounded-tl-lg bg-gray-600">
          <Component {...pageProps} />
        </div>
        
      </div>
    </div>
  )
}

export default MyApp
