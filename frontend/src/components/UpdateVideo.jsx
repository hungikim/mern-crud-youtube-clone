import { useState, forwardRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FormPage, FormTitle, Form, Label, InputName, Input, FormButton } from '../pages/styled/FormPage.styled.js'
import styled from "styled-components"
import { refreshVideo } from "../state/updateSlice.js"

const UpdateVideo = forwardRef( function UpdateVideo({ videoId, originalTitle, originalUrl, originalDesc, userId, token }, ref){
    const [title, setTitle] = useState(originalTitle)
    const [videoUrl, setVideoUrl] = useState(originalUrl)
    const [desc, setDesc] = useState(originalDesc)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleUpdateVideoForm = async (e) => {
        e.preventDefault()
        const fetchUrl = `${import.meta.env.VITE_API_URL}/videos/${videoId}`
        const fetchConfig = {
            method: 'PATCH',
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({ userId: userId, title, videoUrl, desc })
        }
        const rawResponse = await fetch(fetchUrl, fetchConfig)
        const response = await rawResponse.json()

        if (response.err) alert(`Update failed: ${response.err}`)
        else {
            alert("Update success")
            dispatch(refreshVideo())
            navigate(`/video/${videoId}`)
        }

    }
    
    return (
        <UpdatePage ref={ref}>
            <FormTitle>Update Video</FormTitle>
            <Form onSubmit={handleUpdateVideoForm}>
                <Label>
                    <InputName>New Title</InputName>
                    <Input type="text" name="title" value={title} onChange={e=>setTitle(e.target.value)} />
                </Label>
                <Label>
                    <InputName>New Link</InputName>
                    <Input type="text" name="videoUrl" value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} />
                </Label>
                <Label>
                    <InputName>New Description</InputName>
                    <Input type="text" name="desc" value={desc} onChange={e=>setDesc(e.target.value)} />
                </Label>
                <FormButton>Submit</FormButton>
            </Form>
        </UpdatePage>
    )
})
export default UpdateVideo

const UpdatePage = styled(FormPage)`
    position: absolute;
    left: 50%; transform: translateX(-50%);
    z-index: 2;
    width: auto; height: auto;
    padding: 60px;
    gap: 8vh;
    background-color: var(--ui-bg-color);
    border-radius: 20px;
    box-shadow: 0px 0px 1000px 700px black;

    h1 { padding: 0;}
    button { margin-top: 10px;}
`