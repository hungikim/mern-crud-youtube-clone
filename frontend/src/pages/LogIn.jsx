import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setLogin } from "../state/authSlice"
import { FormPage, FormTitle, Form, Label, InputName, Input, FormButton } from './styled/FormPage.styled.js'

export default function LogIn(){
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const handleLogInForm = async (e) => {
        e.preventDefault()
        const fetchUrl = "http://localhost:3001/auth/login"
        const fetchConfig = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ username, password })
        }
        const rawResponse = await fetch(fetchUrl, fetchConfig)
        const response = await rawResponse.json()
        
        if (response.err) {
            alert("Sign in failed")
            alert(`Error: ${response.err}`)
        } else {
            alert("Sign in success")
            dispatch(setLogin({ token: response.token, user: response.user }))
            navigate('/')
        }
    }

    return (
        <FormPage>
            <FormTitle>Log In</FormTitle>
            <Form onSubmit={handleLogInForm}>
                <Label>
                    <InputName>Username</InputName>
                    <Input type="text" name="username" value={username} onChange={e=>setUsername(e.target.value)} />
                </Label>
                <Label>
                    <InputName>Password</InputName>
                    <Input type="text" name="password" value={password} onChange={e=>setPassword(e.target.value)} />
                </Label>
                <FormButton>Log In</FormButton>
            </Form>

        </FormPage>
    )
}