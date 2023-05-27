import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FormPage, FormTitle, Form, Label, InputName, Input, FormButton, FormPageWrapper } from './styled/FormPage.styled.js'
import styled from "styled-components"

export default function PostVideo(){
    const [title, setTitle] = useState("")
    const [videoUrl, setVideoUrl] = useState("")
    const [desc, setDesc] = useState("")
    const navigate = useNavigate()
    const user = useSelector(state=>state.auth.user)
    const token = useSelector(state=>state.auth.token)

    const handlePostVideoForm = async (e) => {
        e.preventDefault()
        const fetchUrl = `${import.meta.env.VITE_API_URL}/videos`
        const fetchConfig = {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({ user: user._id, author: user.channelName, title, videoUrl, desc })
        }
        const rawResponse = await fetch(fetchUrl, fetchConfig)
        const response = await rawResponse.json()

        if (response.err) alert(`Post failed: ${response.err}`)
        else { alert("Post success"); navigate('/')}

    }

    return (
        <FormPageWrapper>
            <PostPage>
                <FormTitle>Post Video</FormTitle>
                <Form onSubmit={handlePostVideoForm}>
                    <Label>
                        <InputName>Title</InputName>
                        <Input type="text" name="title" value={title} onChange={e=>setTitle(e.target.value)} required/>
                    </Label>
                    <Label>
                        <InputName>Link to <br/>YouTube Video</InputName>
                        <Input type="text" name="videoUrl" value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} required/>
                    </Label>
                    <Label>
                        <InputName>Description</InputName>
                        <Input type="text" name="desc" value={desc} onChange={e=>setDesc(e.target.value)} />
                    </Label>
                    <FormButton>Submit</FormButton>
                </Form>
            </PostPage>
        </FormPageWrapper>
    )
}

const PostPage = styled(FormPage)`
`