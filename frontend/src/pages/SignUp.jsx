import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SignUp(){
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [channelName, setChannelName] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUpForm = async (e) => {
        e.preventDefault()
        const fetchUrl = "http://localhost:3001/auth/register"
        const fetchConfig = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ username, channelName, password })
        }
        const rawResponse = await fetch(fetchUrl, fetchConfig)
        const response = await rawResponse.json() // server must send back some JSON

        if (response.err) { // server will send error message with 'err' key
            alert("Sign up failed")
            alert(`Error: ${response.err}`)
        } else { 
            alert("Sign up success") 
            navigate('/login')
        }
    }

    return (
        <div>
            SignUp
            <form onSubmit={handleSignUpForm}>
                <label>Username<input type="text" name="username" value={username} onChange={e=>setUsername(e.target.value)} /></label><br/>
                <label>Channel Name<input type="text" name="channelName" value={channelName} onChange={e=>setChannelName(e.target.value)} /></label><br/>
                <label>Password<input type="text" name="password" value={password} onChange={e=>setPassword(e.target.value)} /></label><br/>
                <button>Submit</button>
            </form>

        </div>
    )
}