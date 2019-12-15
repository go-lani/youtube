import React from 'react';
import qs from 'query-string';
import './VideoPlayer.css';

const VideoPlayer = props => {
  const { videoId } = props.match.params;

  // console.log(videoId);
  const { v } = qs.parse(props.location.search);
  console.log('props.location.search', props.location.search);
  console.log('qs.parse', qs.parse(props.location.search));

  if (!videoId && !v) return null;

  const url = `https://www.youtube.com/embed/${videoId || v}`
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