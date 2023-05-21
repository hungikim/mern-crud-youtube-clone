import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../state/authSlice'

export default function Navbar(){
    const user = useSelector(state=>state.auth.user)
    const dispatch = useDispatch()

    return (
        <div>
          NAVBAR: 
            
          <NavLink to='/'>HOME</NavLink>&nbsp;&nbsp;
          {!user && <NavLink to='/login'>LOGIN</NavLink>}
          {!user && <NavLink to='/signup'>SIGN UP</NavLink>}
          {user && <NavLink to='/postvideo'>POST VIDEO</NavLink>}
          {user && <NavLink to='/' onClick={()=>{dispatch(setLogout());alert("You are logged out")}}>LOGOUT</NavLink>}
          {user && `Logged in as ${user.username}`}
          <br/><br/>
        </div>
    )
}