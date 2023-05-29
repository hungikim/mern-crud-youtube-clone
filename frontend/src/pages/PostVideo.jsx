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
                        <InputNameWithTooltip>
                          <div>Link to <br/>YouTube Video</div>
                          <TooltipWrapper>
                            <TooltipIcon>i</TooltipIcon>
                            <Tooltip>
                                The link will be parsed and<br/>
                                the linked vieo will be embedded.<br/>
                                Other platforms are not supported.
                            </Tooltip>
                          </TooltipWrapper>
                        </InputNameWithTooltip>
                        <Input type="text" name="videoUrl" value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} required/>
                    </Label>
                    <Label>
                        <InputNameWithTooltip>Description<span style={{fontSize:'0.7em'}}>(Optional)</span></InputNameWithTooltip>
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
const InputNameWithTooltip = styled(InputName)`
    display: flex;
    align-items: center;
    gap: 1rem;
`

const TooltipWrapper = styled.div`
    position: relative;
`
const Tooltip = styled.p`
    visibility: hidden;
    white-space: nowrap;
    font-size: 0.8em;
    position: absolute;
    left: 50%;
    bottom: 150%;
    background: var(--ui-bg-color);
    padding: 15px;
    border-radius: 5px;
    transform: translate(-50%);

    &::after {
        content: " ";
        position: absolute;
        top: 100%; /* At the bottom of the tooltip */
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: var(--ui-bg-color) transparent transparent transparent;
    }
    
`

const TooltipIcon = styled.div`
    background: var(--ui-bg-color);
    width: 1.5em; height: 1.5em;
    font-size: 0.8em;
    display: flex; align-items: center; justify-content: center;
    border-radius: 50%;
    &:hover + ${Tooltip} {
        visibility: visible;
    }
`

