import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Video from './pages/Video'
import PostVideo from './pages/PostVideo/'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />          
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<LogIn />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/profile/:userId' element={<Profile />}/>
          <Route path='/video/:videoId' element={<Video />}/>
          <Route path='/postvideo' element={<PostVideo />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
