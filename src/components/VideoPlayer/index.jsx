import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = props => {
  console.log(props);
  // const videoData = {
  //   id: props.selectedVideo.id.videoId,
  //   title: props.selectedVideo.snippet.title,
  //   description: props.selectedVideo.snippet.description,
  //   img: props.selectedVideo.snippet.thumbnails.high.url,
  //   channel: props.selectedVideo.snippet.channelTitle,
  // }

  // if (!videoData.id) return null;

  // const url = `https://www.youtube.com/embed/${videoData.id}`
  return (
    // <section className="video-section">
    //   <figure className="video-area">
    //     <div className="video-box">
    //       <iframe src={url} title={videoData.title}></iframe>
    //     </div>
    //     <figcaption className="video-info">
    //       <div className="channel-title">{videoData.channel}</div>
    //       <div className="title">{videoData.title}</div>
    //       <div className="description">{videoData.description}</div>
    //     </figcaption>
    //   </figure>
    // </section>
    <div></div>
  );
};

export default VideoPlayer;