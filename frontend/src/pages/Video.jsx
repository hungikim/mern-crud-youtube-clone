import { NavLink, useParams } from "react-router-dom"
import YouTube from "../components/YouTube"
import { useState, useEffect } from "react"
import css from './css/Video.module.css'
import { Button } from '../components/styled/Button.styled.js'
import styled from 'styled-components'

// Can access videoId from URL (~/video/:videoId)
export default function Video(){
    const { videoId } = useParams()
    const [video, setVideo] = useState(null)

    useEffect(()=>{
        const controller = new AbortController()
        const signal = controller.signal

        const fetchUrl = `http://localhost:3001/videos/${videoId}`
        const fetchConfig = { method: 'GET' }
        fetch(fetchUrl, fetchConfig)
            .then(res=>res.json())
            .then(jsonData=>setVideo(jsonData))
            .catch(err=>alert(`Failed to fetch video: ${err}`))

        return () => controller.abort()
    },[])

    return (
        <div className={css.VideoPage}>
            {video && 
                <>
                  <YouTube className={css.videoFrame} type='video' videoUrl={video.videoUrl}/>
                  <h2 className={css.videoTitle}>{video.title}</h2>
                  <div className={css.videoAuthor}>
                    <NavLink className={css.videoAuthorIcon} to={`/profile/${video.user}`}>
                        {video.author[0]}   
                    </NavLink>
                    <NavLink className={css.videoAuthorName} to={`/profile/${video.user}`}>
                        {video.author}
                    </NavLink>
                    <SubButton>Subscribe</SubButton>
                    <span className={css.vidButtons}>
                        <VidButton>Like/Dislike</VidButton>
                        <VidButton>Save</VidButton>
                    </span>
                  </div>
                  <div className={css.videoDesc}>
                    <h4>{video.desc? "Description" : "No Description"} • {new Date(video.createdAt).toLocaleString({dateStyle:"short",timeStyle:"short"})}</h4>
                    {video.desc && <p>{video.desc}</p>}
                  </div>
                  <div className={css.videoComments}>Comments: .... (to be implemented)</div>
                </>
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
`