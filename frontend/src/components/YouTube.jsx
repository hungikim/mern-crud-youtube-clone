import styled from 'styled-components'

export default function YouTube( { type, videoUrl } ){

    function youtubeParser(url){ // Parse youtube video ID from link url; source: https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    const youTubeVideoId = youtubeParser(videoUrl)

    if (type === 'thumbnail') {
        return <Thumbnail src={`https://img.youtube.com/vi/${youTubeVideoId}/hqdefault.jpg`} width='320px' height='180px' alt='thumbnail'/>

    } else if (type === 'video') {
        return <Iframe src={`https://www.youtube.com/embed/${youTubeVideoId}`} allow='fullscreen'></Iframe>
    } else { return (<div>SPECIFY 'THUMBNAIL' OR 'VIDEO' FOR YOUTUBE URL</div>) }

}

const Thumbnail = styled.img` 
    aspect-ratio: 16 / 9;
    width: 100%; height: auto;
    object-fit: cover;
    border-radius: 10px;

`

const Iframe = styled.iframe`
    display: block;
    width: 48vw;
    height: 27vw;
    border: none;
`