import React from 'react';
import uuid from 'uuid';
import './VideoList.css';

const VideoListItem = props => {

  // const videoData = {
  //   title: props.videoInfo.snippet.title,
  //   img: props.videoInfo.snippet.thumbnails.high.url,
  //   channel: props.videoInfo.snippet.channelTitle,
  //   id: props.videoInfo.id.videoId,
  // }
  return (
    props.videoInfo.map(video =>
      <li className="video-items" key={uuid.v4()} onClick={(e) => props.onVideoSelect(video)}>
        <a href="#self">
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
    )
  )
}

export default VideoListItem;