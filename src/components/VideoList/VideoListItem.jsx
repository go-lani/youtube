import React from 'react';
import uuid from 'uuid';
import './VideoList.css';

const VideoListItem = (props) => {
  return (
    props.videos.map(video => <li key={uuid.v4()}>{video.snippet.title}</li>)
  )
}

export default VideoListItem;