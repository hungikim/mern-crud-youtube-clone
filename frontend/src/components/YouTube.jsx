import css from './css/YouTube.module.css'

export default function YouTube( { type, videoUrl } ){

    function youtubeParser(url){ // Parse youtube video ID from link url; source: https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    const youTubeVideoId = youtubeParser(videoUrl)

    if (type === 'thumbnail') {
        return <img className={css.thumbnail} src={`https://img.youtube.com/vi/${youTubeVideoId}/hqdefault.jpg`} width='320px' height='180px' alt='thumbnail'/>

    } else if (type === 'video') {
        return <iframe className={css.iframe} src={`https://www.youtube.com/embed/${youTubeVideoId}`} allow='fullscreen'></iframe>
    } else { return (<div>SPECIFY 'THUMBNAIL' OR 'VIDEO' FOR YOUTUBE URL</div>) }

}