import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'query-string';
import './VideoPlayer.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Comment from '../Comment';

import { like, disLike } from '../../actions';
import likeButton from './images/like_2.png';
import disLikeButton from './images/unlike_2.png';
import { withRouter } from 'react-router-dom';


const VideoPlayer = props => {
  const [ info, setInfo ] = useState({ title: '', description: '', channelTitle: '', tags: [], viewCount: 0 });

  const { v: _id } = qs.parse(props.location.search);

  const getDate = async videoid => {
    const params = {
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      part: 'snippet, statistics',
      id: videoid,
    };

    const { data } = await axios.get(
      'https://www.googleapis.com/youtube/v3/videos',
      {
        params,
      },
    );

    setInfo({
      title: data.items[0].snippet.title,
      description: data.items[0].snippet.description,
      channelTitle: data.items[0].snippet.channelTitle,
      tags: data.items[0].snippet.tags,
      viewCount: data.items[0].statistics.viewCount
    });
  }

  useEffect(() => {
    getDate(_id);
  }, [_id]);

  if (!_id) return null;

  const url = `https://www.youtube.com/embed/${_id}`;
  return (
    <>
      <section className="video-section">
        <figure className="video-area">
          <div className="video-box">
            <iframe src={url} title={url}></iframe>
          </div>
          <figcaption className="video-info">
            <div className="channel-title">{info.channelTitle}</div>
            <div className="view-count">조회수 {info.viewCount}회</div>
            <div className="title">{info.title}</div>
            <div className="description">{info.description}</div>
            <ul className="tag-list">
              {info.tags && info.tags.filter((tag, index) => index <= 5).map(tag => <li>#{tag}</li>)}
            </ul>
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
    data: state.vidoes.data
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
