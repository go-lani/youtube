import React from 'react';
import qs from 'query-string';
import './VideoPlayer.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../Header'
import SearchBar from '../SearchBar'

import { like, unLike } from '../../actions';
import likeButton from './images/like_2.png'
import unLikeButton from './images/unlike_2.png'

const VideoPlayer = props => {
  console.log(props.selected);
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
          </div>
          <figcaption className="video-info">
            <div className="title">{props.selected.title}</div>
            <div className="description">{props.selected.description}</div>
            <div className="utils-box">
              <div>
                <button type="button" onClick={() => props.like(_id)}>
                  <img src={likeButton} alt="좋아요"/>
                </button>
                <span className="count">{ props.data[_id] && props.data[_id].like ? props.data[_id].like : 0 }</span>
              </div>
              <div>
                <button type="button" onClick={() => props.unLike(_id)}>
                  <img src={unLikeButton} alt="싫어요"/>
                </button>
                <span className="count">{ props.data[_id] && props.data[_id].unlike ? props.data[_id].unlike : 0 }</span>
              </div>
            </div>
          </figcaption>
        </figure>
      </section>
    </>
  );
};

function mapStateToProps (state) {
  return {
    data: state.vidoes.data,
    selected: state.vidoes.selected
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    like,
    unLike
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);