import React from 'react';
import uuid from 'uuid';
import './VideoList.css';
import { withRouter } from 'react-router-dom'

const VideoListItem = props => {
  console.log(props.videoInfo);
  const videoItems = props.videoInfo.map(video =>
    <li className="video-items" key={uuid.v4()}>
      <a
        href="/"
        onClick={e => {
          e.preventDefault();
          // props.history.push(`/watch/${selectedVideo.id.videoId}`) // REST API
          props.history.push(`/watch?v=${video.id.videoId}`); // Query String
        }
      }>
        <figure className="items-inner">
          <div className="thumbs">
            <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
          </div>
          <figcaption className="caption">
            <div className="title">{video.snippet.title}</div>
            <div className="description">{video.snippet.description}</div>
          </figcaption>
        </figure>
      </a>
    </li>
  );

  return (
    <>
      {videoItems}
    </>
  );
}

export default withRouter(VideoListItem);