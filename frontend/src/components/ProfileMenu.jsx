import styled from "styled-components"
import { setLogout } from '../state/authSlice'
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { forwardRef } from "react"
import { toggleIsProfileMenuVisible } from "../state/menuSlice"

const ProfileMenu = forwardRef( function ProfileMenu (props, ref) {
    const dispatch = useDispatch()

    return (
        <Menu ref={ref}>
            <NavLink to='/' onClick={()=>{
                dispatch(setLogout())
                alert("You are logged out")
                dispatch(toggleIsProfileMenuVisible())
            }}>
                Logout
            </NavLink>
        </Menu>
    )
} )
export default ProfileMenu;

export const Menu = styled.div`
    position: absolute;
    width: 10rem;
    top: 3rem;
    right: 50%;
    transform: translateX(50%);
    background: rgb(50,50,50);
    box-shadow: 0px 0px 4px rgb(0,0,0);
    border-radius: 0.5rem;
    padding: 1.5rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
`