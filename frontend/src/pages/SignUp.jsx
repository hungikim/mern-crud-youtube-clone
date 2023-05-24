import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormPage, FormTitle, Form, Label, InputName, Input, FormButton } from './styled/FormPage.styled.js'

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
        <FormPage>
            <FormTitle>Sign Up</FormTitle>
            <Form onSubmit={handleSignUpForm}>
                <Label>
                    <InputName>Username</InputName>
                    <Input type="text" name="username" value={username} onChange={e=>setUsername(e.target.value)} />
                </Label>
                <Label>
                    <InputName>Channel Name</InputName>
                    <Input type="text" name="channelName" value={channelName} onChange={e=>setChannelName(e.target.value)} />
                </Label>
                <Label>
                    <InputName>Password</InputName>
                    <Input type="text" name="password" value={password} onChange={e=>setPassword(e.target.value)} />
                </Label>
                <FormButton>Sign Up</FormButton>
            </Form>

        </FormPage>
    )
}