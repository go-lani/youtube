import React from 'react';
import qs from 'query-string';
import './VideoPlayer.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../Header'
import SearchBar from '../SearchBar'

import { like, unLike } from '../../actions';
import likeButton from './images/like.png'
import unLikeButton from './images/unlike.png'

const VideoPlayer = props => {
  const { v : _id } = qs.parse(props.location.search);
  if (!_id) return null;

  const url = `https://www.youtube.com/embed/${_id}`
  return (
    <>
      <Header>
        <SearchBar
          onSearchVideos={v => {
            props.history.push(`/result?search_query=${v}`);
          }}
        />
      </Header>
      <section className="video-section">
        <figure className="video-area">
          <div className="video-box">
            <iframe src={url} title={url}></iframe>
            <div className="mt50">
              <div>
                <button type="button" onClick={() => props.like(_id)}>
                  <img src={likeButton} alt="좋아요"/>
                  좋아요
                </button>
                { props.data[_id] && props.data[_id].like ? props.data[_id].like : 0 }
              </div>
              <div>
                <button type="button" onClick={() => props.unLike(_id)}>
                  <img src={unLikeButton} alt="싫어요"/>
                  싫어요
                </button>
                { props.data[_id] && props.data[_id].unlike ? props.data[_id].unlike : 0 }
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
    </>
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