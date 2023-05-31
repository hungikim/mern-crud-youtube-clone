import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import css from './css/NavbarH.module.css'
import { toggleIsProfileMenuVisible, setSearchText, toggleIsMobileMenuVisible } from '../state/menuSlice.js'
import { Button } from './styled/Button.styled.js'
import ProfileMenu from './ProfileMenu'
import { useRef, useState } from 'react'
import { useOutsideCloser } from '../hooks/useOutsideCloser'
import { styled } from 'styled-components'

export default function NavbarH(){
    const user = useSelector(state=>state.auth.user)
    const isMobile = useSelector(state=>state.menu.isMobile)
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
    const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false)

    if (isMobile) { return (  // Mobile Navbar
      <nav className={css.NavbarH}>
        <MobileNavLeft>
          {isMobileSearchOpen ? (
            <SearchBar/>
          ) : (
            <>
              <MobileMenuButton onClick={()=>setIsMobileMenuOpen(true)}/>
              <Logo />
            </>
          )}
        </MobileNavLeft>

        <span className={css.navRight}>
          <MobileSearchButton onClick={()=>setIsMobileSearchOpen(isMobileSearchOpen? false : true)} />
          {!isMobileSearchOpen && <MobileProfileButton onClick={()=>setIsMobileProfileOpen(isMobileProfileOpen? false : true)}/>}
          <MobileProfileMenu isOpen={isMobileProfileOpen}/>
        </span>

      </nav>

    ) } else { return ( // Desktop Navbar

         <nav className={css.NavbarH}>
           <Logo />
           <SearchBar/>
           
           <span className={css.navRight}>
             {user?  ( <><PostVideoButton/><Profile user={user}/></> 
              ) : ( <><LoginButton/><SignupButton/></>)
             }
           </span>
         </nav>
    ) }
}


const Logo = () => {
  const goToTop = () => document.querySelector(".Content").scroll(0,0)

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
  const dispatch = useDispatch()

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

/* Mobile Components */

const MobileSearchButton = ({ onClick }) => (
  <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 96 960 960">
    <path fill="currentColor" d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z"/>
  </svg>
)
const MobileProfileButton = ({ onClick }) => (
  <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 -960 960 960">
    <path fill="currentColor" d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z"/>
  </svg>
)
const MobileMenuButton = () => {
  const dispatch = useDispatch()
  return (
    <svg onClick={()=>dispatch(toggleIsMobileMenuVisible())} xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 -960 960 960">
      <path fill="currentColor" d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/>
    </svg>
  )
}

const MobileProfileMenu = ({ isOpen }) => ( 
  <div style={{display: isOpen? 'initial' : 'none'}}>
    hi
  </div>
)


const MobileNavLeft = styled.span`
  display: flex;
  gap: 3px;
  align-items: center;
`