import React from 'react';
import './VideoList.css';
import VideoListItem from './VideoListItem';

const VideoList = (props) => {
  console.log('props', props);
  return (
    <section className="main">
      <ul className="result-list">
        <VideoListItem {...props} />
      </ul>
    </section>
  );
};

export default VideoList;