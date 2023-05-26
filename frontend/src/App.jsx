import './App.css'
import NavbarH from './components/NavbarH'
import NavbarV from './components/NavbarV'
import AllVideos from './pages/AllVideos'
import Profile from './pages/Profile'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Video from './pages/Video'
import PostVideo from './pages/PostVideo/'
import UpdateVideo from './components/UpdateVideo'
import NotFound from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <NavbarH />
      <div className='Section-below-navbar-h'>
        <NavbarV />
        <div className="Content">
          <Routes>
            <Route path='/' element={<AllVideos />}/>
            <Route path='/login' element={<LogIn />}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/profile/:userId' element={<Profile />}/>
            <Route path='/video/:videoId' element={<Video />}/>
            <Route path='/postvideo' element={<PostVideo />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
