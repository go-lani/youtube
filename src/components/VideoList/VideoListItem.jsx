import React from 'react';
import uuid from 'uuid';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './VideoList.css';
import { selectedVideo } from '../../actions';

const VideoListItem = props => {
  const videoItems = props.videoInfo.map(video =>
    <li className="video-items" key={uuid.v4()}>
      <a
        href="/"
        onClick={e => {
          e.preventDefault();
          // props.history.push(`/watch/${selectedVideo.id.videoId}`) // REST API
          props.history.push(`/watch?v=${video.id.videoId}`); // Query String
          props.selectedVideo(video.snippet.title, video.snippet.description)
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

function mapStateToProps(state) {
  return {
    selected: state.vidoes.selected
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectedVideo
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VideoListItem));