import React from 'react';
import './VideoList.css';

const VideoList = props => {
  return (
    <section className="main">
      <ul className="result-list">
        {props.children}
      </ul>
    </section>
  );
};

export default VideoList;