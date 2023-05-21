export default function YouTube( { type, videoUrl } ){

    function youtubeParser(url){ // Parse youtube video ID from link url; source: https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    const youTubeVideoId = youtubeParser(videoUrl)

    if (type === 'thumbnail') {
        return <img className='thumbnail' src={`https://img.youtube.com/vi/${youTubeVideoId}/hqdefault.jpg`} />
    } else if (type === 'video') {
        return <iframe src={`https://www.youtube.com/embed/${youTubeVideoId}`} allow='fullscreen'></iframe>
    } else { return (<div>SPECIFY 'THUMBNAIL' OR 'VIDEO' FOR YOUTUBE URL</div>) }

}