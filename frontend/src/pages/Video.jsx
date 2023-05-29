import { NavLink, useNavigate, useParams } from "react-router-dom"
import YouTube from "../components/YouTube"
import { useState, useEffect, useRef } from "react"
import css from './css/Video.module.css'
import { Button } from '../components/styled/Button.styled.js'
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
import UpdateVideo from "../components/UpdateVideo"
import { useOutsideCloser } from "../hooks/useOutsideCloser"
import { setIsUpdateFormVisible, toggleIsUpdateFormVisible } from "../state/updateSlice"

// Can access videoId from URL (~/video/:videoId)
export default function Video(){
    const { videoId } = useParams()
    const [video, setVideo] = useState(null)
    const navigate = useNavigate()
    const user = useSelector(state=>state.auth.user)
    const token = useSelector(state=>state.auth.token)
    const dispatch = useDispatch()
    const isUpdateFormVisible = useSelector(state=>state.update.isUpdateFormVisible)
    // Reload video everytime it is updated
    const updateTrigger = useSelector(state=>state.update.updateTrigger)

    // Fetch Video
    useEffect(()=>{
        const controller = new AbortController()
        const signal = controller.signal
        const fetchVideo = async () => {
            const fetchUrl = `${import.meta.env.VITE_API_URL}/videos/${videoId}`
            const fetchConfig = { method: 'GET' }
            const rawResponse = await fetch(fetchUrl, fetchConfig)
            const response = await rawResponse.json()
            if (!response.err) setVideo(response)
        }
        fetchVideo()
          .catch(err=>{console.log(err);alert(`Failed to fetch video: ${err}`);})

        dispatch(setIsUpdateFormVisible(false))

        return () => controller.abort()
    },[updateTrigger])

    const deleteVideo = async () => {
        if (!confirm("Are you sure you want to delete this video?")) return

        const fetchUrl = `${import.meta.env.VITE_API_URL}/videos/${videoId}`
        const fetchConfig = {
            method: 'DELETE',
            headers: { 
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}` 
            },
            body: JSON.stringify({ user: user })
        }
        const rawResponse = await fetch(fetchUrl, fetchConfig)
        const response = await rawResponse.json()
        if (response.err) alert(`Delete failed: ${response.err}`)
        else { alert("Delete success"); navigate('/')}
    }

    const updateRef = useRef()
    const updateButtonRef = useRef()
    useOutsideCloser(updateRef, updateButtonRef, toggleIsUpdateFormVisible)

    return (
        <div className={css.VideoPage}>
            {video?
                <>
                  <YouTube type='video' videoUrl={video.videoUrl}/>
                  <h2 className={css.title}>{video.title}</h2>
                  <div className={css.author}>
                    <NavLink className={css.authorIcon} to={`/profile/${video.user}`}>
                        {video.author[0]}   
                    </NavLink>
                    <NavLink className={css.authorName} to={`/profile/${video.user}`}>
                        {video.author}
                    </NavLink>
                    <SubButton>Subscribe</SubButton>
                    <span className={css.vidButtons}>
                        <VidButton>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill='gray' d="M272-120v-512l225-238q13.6-14 32.187-16.5Q547.773-889 565-879q17 10 25.5 27.5t4.2 36.5L556-632h299q24 0 42 18t18 42v81.839q0 7.161 1.5 14.661T915-461L789-171q-8.878 21.25-29.595 36.125Q738.689-120 716-120H272Zm60-487v427h397l126-299v-93H482l53-249-203 214ZM139-120q-24.75 0-42.375-17.625T79-180v-392q0-24.75 17.625-42.375T139-632h133v60H139v392h133v60H139Zm193-60v-427 427Z"/></svg>
                        </VidButton>
                        <VidButton>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill='gray' d="M120-330v-60h300v60H120Zm0-165v-60h470v60H120Zm0-165v-60h470v60H120Zm530 500v-170H480v-60h170v-170h60v170h170v60H710v170h-60Z"/></svg>
                        </VidButton>
                        {/* Show Edit / Delete Buttons when the logged in user is the author of the video */}
                        {(user && (user._id == video.user)) && (
                            <>
                            <ActiveButton ref={updateButtonRef} onClick={()=>dispatch(toggleIsUpdateFormVisible())}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill='var(--main-color)' d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l41.823-41.823Q725-853 750.5-852.5T793-835l43 43q17 17 17 42t-16.963 41.963L794-666ZM150.327-120q-12.889 0-21.608-8.714Q120-137.429 120-150.311v-85.627Q120-242 122-247q2-5 7-10l495-495 128 128-495 495q-5 5-10.217 7-5.218 2-10.783 2h-85.673ZM645-645l-22-22 44 44-22-22Z"/></svg>
                                Edit
                            </ActiveButton>
                            <ActiveButton onClick={deleteVideo}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill='var(--main-color)' d="M261-120q-24 0-42-18t-18-42v-570h-11q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T190-810h158q0-13 8.625-21.5T378-840h204q12.75 0 21.375 8.625T612-810h158q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T770-750h-11v570q0 24-18 42t-42 18H261Zm0-630v570h438v-570H261Zm0 0v570-570Zm219 330 96 97q11 10 24.5 10t23.5-10q10-10 10.5-24T624-370l-96-98 96-98q10-10 10.5-24t-10.457-23.087Q614-623 600.067-623q-13.934 0-24.067 10l-96 97-95-97q-9-11-23-10.5T337-613q-11 10-10.5 23.5T337-565l96 97-96 97q-10 10-10 23.5t10.043 24.457Q348-313 361.5-313t23.5-10l95-97Z"/></svg>
                                Delete
                            </ActiveButton>
                            </>
                        )}
                    </span>
                  </div>
                  <div className={css.desc}>
                    <h4>
                        {video.desc? "Description" : "No Description"} • Created at {new Date(video.createdAt).toLocaleString({dateStyle:"short",timeStyle:"short"})} • {video.views} views
                    </h4>
                    {video.desc && <p>{video.desc}</p>}
                  </div>
                  <div className={css.comments}>Comments: ....</div>
                </>
                
                : // Load fail
                <>
                <div>Failed to load video</div>
                </>
            }
            {isUpdateFormVisible && 
              <UpdateVideo ref={updateRef} videoId={videoId} originalTitle={video.title} originalUrl={video.videoUrl} originalDesc={video.desc} userId={user._id} token={token} />
            }
        </div>
    )
}

const SubButton = styled(Button)`
    background-color: rgb(230,230,230);
    color: gray;
    cursor: default;
`

const VidButton = styled(Button)`
    color: gray;
    cursor: default;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`

const ActiveButton = styled(VidButton)`
    color: var(--main-color);
    cursor: pointer;
`