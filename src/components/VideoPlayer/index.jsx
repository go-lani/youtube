import React from 'react';
import qs from 'query-string';
import './VideoPlayer.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { like, unLike } from '../../actions';
import likeButton from './images/like.png'
import unLikeButton from './images/unlike.png'

const VideoPlayer = props => {
  const { v } = qs.parse(props.location.search);

  if (!v) return null;

  const url = `https://www.youtube.com/embed/${v}`
  return (
    <section className="video-section">
      <figure className="video-area">
        <div className="video-box">
          <iframe src={url} title={url}></iframe>
          <div className="mt50">
            <div>
              <button type="button" onClick={() => props.like(v)}>
                <img src={likeButton} alt="좋아요"/>
                좋아요
              </button>
              { props.data[v] ? props.data[v].like : 0 }
            </div>
            <div>
              <button type="button" onClick={() => props.unLike(v)}>
                <img src={unLikeButton} alt="싫어요"/>
                싫어요
              </button>
              { props.data[v] ? props.data[v].unlike : 0 }
            </div>
          </div>
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

function mapStateToProps (state) {
  return {
    data: state.vidoes.data
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    like,
    unLike
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);