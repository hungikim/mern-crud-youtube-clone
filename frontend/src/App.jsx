import './App.css'
import Navbar from './components/Navbar'
import AllVideos from './pages/AllVideos'
import Profile from './pages/Profile'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Video from './pages/Video'
import PostVideo from './pages/PostVideo/'
import NotFound from './pages/NotFound'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
    </BrowserRouter>
  )
}

export default App
