import { useParams } from "react-router-dom"
import YouTube from "../components/YouTube"
import { useState, useEffect } from "react"

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
        <div>
            {video && 
                <>
                  <div><YouTube type='video' videoUrl={video.videoUrl}/></div>
                  <div>Title: {video.title}</div>
                  <div>Posted by: {video.author}</div>
                  <div>Description: {video.desc}</div>
                  <div>Comments: .... (to be implemented)</div>
                </>
            }
        </div>
    )
}