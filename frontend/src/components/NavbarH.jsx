import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import css from './css/NavbarH.module.css'
import { setIsProfileMenuOpen } from '../state/menuSlice.js'
import { Button } from './styled/Button.styled.js'
import ProfileMenu from './ProfileMenu'
import { useEffect, useRef } from 'react'

export default function NavbarH(){
    const user = useSelector(state=>state.auth.user)
    const goToTop = () => scroll(0,0)
    const isProfileMenuOpen = useSelector(state=>state.menu.isProfileMenuOpen)
    const dispatch = useDispatch()

    const profileMenuRef = useRef()
    const profileButtonRef = useRef()
    // Close profile menu when anywhere outside of it is clicked
    useEffect(() => {
        function handleClickOutside(e) {
          if (profileMenuRef.current && !profileMenuRef.current.contains(e.target) 
                && (!profileButtonRef.current || !profileButtonRef.current.contains(e.target) )) {
            dispatch(setIsProfileMenuOpen())
          }
        }
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [profileMenuRef])

    return (
      <nav className={css.NavbarH}>

        <span className={css.logo}>
          <NavLink to='/' onClick={goToTop}>
            <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="-35.20005 -41.33325 305.0671 247.9995"><path d="M229.763 25.817c-2.699-10.162-10.65-18.165-20.747-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.554 7.652 7.602 15.655 4.904 25.817 0 44.237 0 82.667 0 82.667s0 38.43 4.904 56.85c2.698 10.162 10.65 18.164 20.747 20.881 18.3 4.935 91.682 4.935 91.682 4.935s73.383 0 91.683-4.935c10.097-2.717 18.048-10.72 20.747-20.88 4.904-18.422 4.904-56.851 4.904-56.851s0-38.43-4.904-56.85" fill="red"/><path d="M93.333 117.558l61.334-34.89-61.334-34.893z" fill="#fff"/></svg>
            <h1>HungiTube</h1>
          </NavLink>
        </span>

        <div className={css.searchBarWrapper}>
          <input className={css.searchBar} type='text' placeholder='Search'/>
          <div className={css.autoComplete}>
            <svg className={css.searchIcon} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960"><path fill="gray" d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z"/></svg>
            Search feature is currently not supported.
          </div>
        </div>

        <span className={css.navRight}>

          {!user &&
            <>
              <NavLink to='/login'><Button>Login</Button></NavLink>
              <NavLink to='/signup'><Button>Sign Up</Button></NavLink>
            </>
          }
          
          {user && 
            <>   
              <NavLink to='/postvideo'>
                <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960"><path fill="currentColor" d="M445.935 860.065v-250h-250v-68.13h250v-250h68.13v250h250v68.13h-250v250h-68.13Z"/></svg>
              </NavLink>
              <span className={css.profile}>
                <span className={css.profileItem} onClick={()=>dispatch(setIsProfileMenuOpen())} ref={profileButtonRef}>
                  {user.channelName}
                </span>
                {isProfileMenuOpen && <ProfileMenu ref={profileMenuRef}/>}
              </span>
            </>
          }

        </span>

      </nav>
    )
}