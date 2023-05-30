import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import css from './css/NavbarH.module.css'
import { toggleIsProfileMenuVisible, setSearchText } from '../state/menuSlice.js'
import { Button } from './styled/Button.styled.js'
import ProfileMenu from './ProfileMenu'
import { useRef, useState } from 'react'
import { useOutsideCloser } from '../hooks/useOutsideCloser'

export default function NavbarH(){
    const user = useSelector(state=>state.auth.user)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
      <nav className={css.NavbarH}>

        <Logo />
        <SearchBar />

        <span className={css.navRight}>

          {!user && !isMobileMenuOpen &&
            <>
              <LoginButton />
              <SignupButton />
            </>
          }
          
          {user && !isMobileMenuOpen &&
            <>   
              <PostVideoButton />
              <Profile user={user} />
            </>
          }

          {isMobileMenuOpen &&
            <>

            </>
          }
        </span>

      </nav>
    )
}


const Logo = () => {
  const goToTop = () => scroll(0,0)
  return (
  <span className={css.logo}>
    <NavLink to='/' onClick={goToTop}>
      <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="-35.20005 -41.33325 305.0671 247.9995"><path d="M229.763 25.817c-2.699-10.162-10.65-18.165-20.747-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.554 7.652 7.602 15.655 4.904 25.817 0 44.237 0 82.667 0 82.667s0 38.43 4.904 56.85c2.698 10.162 10.65 18.164 20.747 20.881 18.3 4.935 91.682 4.935 91.682 4.935s73.383 0 91.683-4.935c10.097-2.717 18.048-10.72 20.747-20.88 4.904-18.422 4.904-56.851 4.904-56.851s0-38.43-4.904-56.85" fill="red"/><path d="M93.333 117.558l61.334-34.89-61.334-34.893z" fill="#fff"/></svg>
      <h1>HungiTube</h1>
    </NavLink>
  </span>
  )
}
const SearchBar = () => {
  const searchText = useSelector(state=>state.menu.searchText)
  return (
    <div className={css.searchBarWrapper}>
      <input className={css.searchBar} type='text' placeholder='Search' value={searchText} onChange={(e)=>dispatch(setSearchText(e.target.value))} />
    </div>
  )
}
const LoginButton = () => <NavLink to='/login' className={css.loginButton}><Button>Login</Button></NavLink>
const SignupButton = () => <NavLink to='/signup' className={css.signupButton}><Button>Sign Up</Button></NavLink>
const PostVideoButton = () => (
  <NavLink to='/postvideo'>
    <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960"><path fill="currentColor" d="M445.935 860.065v-250h-250v-68.13h250v-250h68.13v250h250v68.13h-250v250h-68.13Z"/></svg>
  </NavLink>
)

const Profile = ({ user }) => {
  const isProfileMenuVisible = useSelector(state=>state.menu.isProfileMenuVisible)
  const dispatch = useDispatch()
  const profileMenuRef = useRef()
  const profileButtonRef = useRef()
  useOutsideCloser(profileMenuRef, profileButtonRef, toggleIsProfileMenuVisible)

  return (
    <span className={css.profile}>
      <span className={css.profileItem} onClick={()=>dispatch(toggleIsProfileMenuVisible())} ref={profileButtonRef}>
        {user.channelName}
      </span>
      {isProfileMenuVisible && <ProfileMenu ref={profileMenuRef}/>}
    </span>
  )
}