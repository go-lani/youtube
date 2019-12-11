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
  console.log('VideoListItem', props)
  return (
    props.videoInfo.map(video =>
      <li className="video-items" key={uuid.v4()} onClick={(e) => {
        console.log(video.id.videoId);
        props.onVideoSelect(video.id.videoId)
        }}>
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