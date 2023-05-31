import './App.css'
import NavbarH from './components/NavbarH'
import NavbarV from './components/NavbarV'
import AllVideos from './pages/AllVideos'
import Profile from './pages/Profile'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Video from './pages/Video'
import PostVideo from './pages/PostVideo/'
import NotFound from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'
import { setIsMobile } from './state/menuSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const isMobile = useSelector(state=>state.menu.isMobile)
  const query = "(max-width:768px)" // Check for mobile devices
  const dispatch = useDispatch()
  useEffect(() => { // Detect mobile devices. Source: https://fireship.io/snippets/use-media-query-hook/
    const media = window.matchMedia(query);
    if (media.matches !== isMobile) {
      dispatch(setIsMobile(media.matches))
    }
    const listener = () => dispatch(setIsMobile(media.matches))
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [isMobile, query]);

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
