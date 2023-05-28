import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import UserVideosPreview from "../components/UserVideosPreview.jsx"
import styled from 'styled-components'

// Can access userId from URL (~/profile/:userId)
export default function Profile(){
    const { userId } = useParams()
    const [user, setUser] = useState(null)

    useEffect(()=>{
        const controller = new AbortController()
        const signal = controller.signal

        const fetchUrl = `${import.meta.env.VITE_API_URL}/users/${userId}`
        const fetchConfig = { method: 'GET' }
        fetch(fetchUrl, fetchConfig)
            .then(res=>res.json())
            .then(jsonData=>setUser(jsonData))
            .catch(err=>alert(`Failed to fetch user: ${err}`))

        return () => controller.abort()
    },[])
    return (
        <ProfilePage>
          {user && 
            <>
              <Heading>
                <ProfileBubble>{user.channelName}</ProfileBubble>
                <ChannelTitle>{user.channelName}'s Channel</ChannelTitle>
                <Username>Username: {user.username}</Username>
              </Heading>
              <VideosHeading>
                {user.channelName}'s videos:
              </VideosHeading>
              <UserVideosPreview userId={userId}/>
              
            </>
          }
        </ProfilePage>
    )
}

const ProfilePage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media (max-width: 768px) {
        margin-top: 10px;
        gap: 0;
    }
`
const Heading = styled.div`
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 5px;
    }
`
const ProfileBubble = styled.h1`
    display: inline;
    padding: 8px 14px;
    font-size: 1.5em;
    background-color: rgb(155, 89, 89);
    border-radius: 2rem;
`

const ChannelTitle = styled.h2`
    display: inline;
    margin: 0 1rem;
    @media (max-width: 768px) {
        display: none;
    }
`

const Username = styled.h2`
    font-size: 1em;
    font-weight: normal;
    display: inline;
    @media (max-width: 768px) {
        display: none;
    }
`

const VideosHeading = styled.h4`
    margin-top: 2rem;
    margin-bottom: 1rem;
`