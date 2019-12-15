import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = props => {
  const { videoId } = props.match.params;

  if (!videoId) return null;

  const url = `https://www.youtube.com/embed/${videoId}`
  return (
    <section className="video-section">
      <figure className="video-area">
        <div className="video-box">
          <iframe src={url} title={url}></iframe>
        </div>
        {/* <figcaption className="video-info">
          <div className="channel-title">{videoData.channel}</div>
          <div className="title">{videoData.title}</div>
          <div className="description">{videoData.description}</div>
        </figcaption> */}
      </figure>
    </section>
  );
};

export default VideoPlayer;