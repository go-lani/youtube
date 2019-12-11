import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = props => {
  const { videoId } = props;
  if (!videoId) return null;
  const url = `https://www.youtube.com/embed/${videoId}`
  return (
    <section>
      <iframe src={url} title={videoId}></iframe>
    </section>
  );
};

export default VideoPlayer;