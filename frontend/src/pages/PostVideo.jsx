import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function PostVideo(){
    const [title, setTitle] = useState("")
    const [videoUrl, setVideoUrl] = useState("")
    const [desc, setDesc] = useState("")
    const navigate = useNavigate()
    const user = useSelector(state=>state.auth.user)
    const token = useSelector(state=>state.auth.token)

    const handlePostVideoForm = async (e) => {
        e.preventDefault()
        const fetchUrl = "http://localhost:3001/videos"
        const fetchConfig = {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({ userId: user._id, channelName: user.channelName, title, videoUrl, desc })
        }
        const rawResponse = await fetch(fetchUrl, fetchConfig)
        const response = await rawResponse.json()

        if (response.err) alert(`Post failed: ${response.err}`)
        else { alert("Post success"); navigate('/')}

    }

    return (
        <div>
            PostVideo
            <form onSubmit={handlePostVideoForm}>
                <label>Title<input type="text" name="title" value={title} onChange={e=>setTitle(e.target.value)} /></label><br/>
                <label>Link to YouTube Video<input type="text" name="videoUrl" value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} /></label><br/>
                <label>Description<input type="text" name="desc" value={desc} onChange={e=>setDesc(e.target.value)} /></label><br/>
                <button>Submit</button>
            </form>
        </div>
    )
}