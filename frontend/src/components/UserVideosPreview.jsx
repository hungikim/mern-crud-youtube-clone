import { useEffect, useState } from 'react'
import Preview from './Preview.jsx'

export default function UserVideosPreview ({ userId }) {
    const [userVideos, setUserVideos] = useState(null)

    const getUserVideos = async () => {
        const rawResponse = await fetch(`${import.meta.env.VITE_API_URL}/videos/user/${userId}`, { method: "GET" })
        const response = await rawResponse.json()
        console.log(response)
        if (response.err) alert(`Failed to get user videos: ${response.err}`)
        else setUserVideos(response)
    }
    useEffect(() => {
        getUserVideos()
    }, [userId])

    return (
        <div>
            {userVideos &&
                userVideos.map( ({ _id, user, author, title, videoUrl }) =>
                    <Preview key={_id} videoId={_id} userId={user} author={author} title={title} videoUrl={videoUrl} />
                )
            }
        </div>
    )
}