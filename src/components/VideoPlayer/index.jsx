import React from 'react';
import qs from 'query-string';
import './VideoPlayer.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../Header';
import SearchBar from '../SearchBar';
import Comment from '../Comment';

import { like, disLike } from '../../actions';
import likeButton from './images/like_2.png';
import disLikeButton from './images/unlike_2.png';
import { withRouter } from 'react-router-dom';

const VideoPlayer = props => {
  const { v: _id } = qs.parse(props.location.search);
  if (!_id) return null;

  const url = `https://www.youtube.com/embed/${_id}`;
  return (
    <>
      <Header>
        <SearchBar
          onSearchVideos={e => {
            props.history.push(`/result?search_query=${e.target.value}`);
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
                  <img src={likeButton} alt="좋아요" />
                </button>
                <span className="count">
                  {props.data[_id] && props.data[_id].like ? props.data[_id].like : 0}
                </span>
              </div>
              <div>
                <button type="button" onClick={() => props.disLike(_id)}>
                  <img src={disLikeButton} alt="싫어요" />
                </button>
                <span className="count">
                  {props.data[_id] && props.data[_id].dislike ? props.data[_id].dislike : 0}
                </span>
              </div>
            </div>
          </figcaption>
        </figure>
        <Comment videoId={_id} />
      </section>
    </>
  );
};

function mapStateToProps(state) {
  return {
    data: state.vidoes.data,
    selected: state.vidoes.selected,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      like,
      disLike,
    },
    dispatch,
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoPlayer));
