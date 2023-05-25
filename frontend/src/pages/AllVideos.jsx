import { useEffect, useState } from "react"
import Preview from '../components/Preview.jsx'

export default function AllVideos(){
    const [allVideos, setAllVideos] = useState(null)

    const getVideos = async () => {
        const fetchUrl = `${import.meta.env.VITE_API_URL}/videos`
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
        <div className="AllVideos">
            {allVideos &&  
                allVideos.map( ({ _id, user, author, title, videoUrl }) => 
                    <Preview key={_id} videoId={_id} userId={user} author={author} title={title} videoUrl={videoUrl}/>
                )
            }
            { (allVideos == null || allVideos.length == 0) && 
            
                <div>
                    Loading ... <br/>
                    <br/>
                    If you don't see any data on this website, please just check back within a minute.<br/>
                    This website is hosted with a free plan where the server only wakes up when there is a new request.<br/>
                    If you still don't see anything, then there's no videos posted.<br/>
                </div>
            }
        </div>
    )
}