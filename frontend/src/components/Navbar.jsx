import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../state/authSlice'
import css from './css/Navbar.module.css'
import { useState } from 'react'
import { Button } from './styled/Button.styled.js'

export default function Navbar(){
    const user = useSelector(state=>state.auth.user)
    const dispatch = useDispatch()
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

    return (
      <nav className={css.Navbar}>

        <div className={css.HorizontalNavbar}>

          <span className={css.logo}>
            <NavLink to='/'>
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
                  <span className={css.profileItem} onClick={()=>setIsProfileMenuOpen(isProfileMenuOpen? false : true)}>
                    {user.channelName}
                  </span>
                  {isProfileMenuOpen && 
                    <div className={css.profileMenu}>
                      <NavLink to='/' onClick={()=>{dispatch(setLogout());alert("You are logged out")}}>Logout</NavLink>
                      <div>Somediv</div>
                    </div>
                  }
                </span>
              </>
            }

          </span>

        </div>

        <div className={css.VerticalNavbar}>         
          <NavLink to='/'>
            <div className={css.navItem}>
              <svg className={css.icon} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960"><path fill="currentColor" d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z"/></svg>
              Home
            </div>
          </NavLink>
          <NavLink to='/'>
            <div className={css.navItem}>
              <svg className={css.icon} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960"><path fill="currentColor" d="M140 976q-24 0-42-18t-18-42V476q0-24 18-42t42-18h680q24 0 42 18t18 42v440q0 24-18 42t-42 18H140Zm0-60h680V476H140v440Zm267-71 221-149-221-148v297ZM149 356v-60h662v60H149Zm131-120v-60h400v60H280ZM140 916V476v440Z"/></svg>
              Subscription
            </div>
          </NavLink>
          <NavLink to='/'>
            <div className={css.navItem}>
              <svg className={css.icon} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960"><path fill="currentColor" d="M100 726v-60h306v60H100Zm0-165v-60h473v60H100Zm0-165v-60h473v60H100Zm542 540V614l218 161-218 161Z"/></svg>
              Playlists
            </div>
          </NavLink>         
          <NavLink to='/'>
            <div className={css.navItem}>
              <svg className={css.icon} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960"><path fill="currentColor" d="m387 745 261-169-261-169v338ZM180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z"/></svg>
              My Videos
            </div>
          </NavLink>
          <NavLink to='/'>
            <div className={css.navItem}>
            <svg className={css.icon} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960"><path fill="currentColor" d="m627 769 45-45-159-160V363h-60v225l174 181ZM480 976q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-82 31.5-155t86-127.5Q252 239 325 207.5T480 176q82 0 155 31.5t127.5 86Q817 348 848.5 421T880 576q0 82-31.5 155t-86 127.5Q708 913 635 944.5T480 976Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480 236q-140 0-240 100T140 576q0 140 100 240t240 100Z"/></svg>
              Watch Later
            </div>
          </NavLink>
        </div>
      </nav>
    )
}