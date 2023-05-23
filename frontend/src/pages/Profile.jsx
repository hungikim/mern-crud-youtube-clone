import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import UserVideosPreview from "../components/UserVideosPreview.jsx"

// Can access userId from URL (~/profile/:userId)
export default function Profile(){
    const { userId } = useParams()
    const [user, setUser] = useState(null)

    useEffect(()=>{
        const controller = new AbortController()
        const signal = controller.signal

        const fetchUrl = `http://localhost:3001/users/${userId}`
        const fetchConfig = { method: 'GET' }
        fetch(fetchUrl, fetchConfig)
            .then(res=>res.json())
            .then(jsonData=>setUser(jsonData))
            .catch(err=>alert(`Failed to fetch user: ${err}`))

        return () => controller.abort()
    },[])
    return (
        <div>
            <div>Profile</div>
            {user && 
            <>
                <div>Channel Name: {user.channelName}</div>
                <div>Username: {user.username}</div>
                <div>
                    {user.channelName}'s videos:
                    <UserVideosPreview userId={userId}/>
                </div>
            </>
            }
        </div>
    )
}