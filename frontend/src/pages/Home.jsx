import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import YouTube from "../components/YouTube"

export default function Home(){
    const [allVideos, setAllVideos] = useState(null)

    const getVideos = async () => {
        const fetchUrl = "http://localhost:3001/videos"
        const fetchConfig = { method: 'GET' }
        const rawResponse = await fetch(fetchUrl, fetchConfig)
        const response = await rawResponse.json()

        if (response.err) alert(`Failed to get videos: ${response.err}`)
        else setAllVideos(response)
    }

    useEffect(()=>{
        getVideos()
    }, [allVideos])

    return (
        <div>
            <div>Home</div><br/>
            {allVideos && 
                allVideos.map( ({ _id, author, title, videoUrl, desc }) => 
                    <div key={_id}>
                        <div><YouTube type='thumbnail' videoUrl={videoUrl}/></div>
                        <div>Posted by: {author}</div>
                        <div>Title: {title}</div>
                        <div>Description: {desc}</div>
                        <NavLink to={`/video/${_id}`}>Details</NavLink>
                        <br/><br/>
                    </div>
                )
            }
        </div>
    )
}