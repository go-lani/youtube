import React from 'react';
import './VideoList.css';
import VideoListItem from './VideoListItem';

const VideoList = (props) => {
  return (
    <section className="main">
      <ul className="result-list">
        <VideoListItem videoInfo={props.videos} />
      </ul>
    </section>
  );
};

export default VideoList;