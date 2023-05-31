import { NavLink } from 'react-router-dom'
import css from './css/NavbarV.module.css'
import { useSelector } from 'react-redux'

export default function NavbarV () {
  const isMobile = useSelector(state=>state.menu.isMobile)
  const isMobileMenuVisible = useSelector(state=>state.menu.isMobileMenuVisible)

  if (isMobile && !isMobileMenuVisible) return null
  return (
    <div className={css.NavbarV}>         
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
  )
}

