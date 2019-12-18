import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
// import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoListItem from './components/VideoList/VideoListItem';
import { updateQuery } from './actions';
import spinner from './components/images/spinner.gif';
import './App.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      // query: this.props.query, this.props로 query를 받을 수 있다. connect를 함수로 prop에 맵핑했기때문이다.
      nextPageToken: null
    };

    this.defaultState = this.state;
    Object.getOwnPropertyNames(Main.prototype).forEach(key => this[key] = this[key].bind(this));
  }

  async getYoutubeData(query) {
    if (!query) {
      this.props.history.push(`/result?search_query=${query}`);
      this.setState(this.defaultState)
      return;
    }
    if (this.props.query !== query) {
      this.props.history.push(`/result?search_query=${query}`);
      this.setState(this.defaultState)
    }

    const { nextPageToken } = this.state;

    const params = {
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      q: query,
      part: 'snippet',
      maxResults: 5,
      pageToken: nextPageToken,
    };

    try {
      const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });

      this.setState({
        videos: [...this.state.videos, ...data.items],
        nextPageToken: data.nextPageToken
      });

      this.props.updateQuery(query);

    } catch(err) {
      console.error(err);
    }
  }

  componentDidMount() {
    const { props } = this;
    if (props.location) {
      const { search_query } = qs.parse(props.location.search);
      if (search_query) this.getYoutubeData(search_query);
    }
  }

  render() {
    const { query, selectedVideo, nextPageToken, videos } = this.state;

    return (
      <div className="App">
        <Header>
          <SearchBar onSearchVideos={debounce(this.getYoutubeData, 500)}/>
        </Header>
        <InfiniteScroll
          loadMore={() => this.getYoutubeData(query)}
          hasMore={!!nextPageToken}
          loader={
            <div key={uuid.v4()} className="loader">
              <img src={spinner} alt="loading" />
            </div>
          }>
          <VideoList>
            <VideoListItem
              videoInfo={videos}
              onVideoSelect={selectedVideo => {
                // this.props.history.push(`/watch/${selectedVideo.id.videoId}`) // REST API
                this.props.history.push(`/watch?v=${selectedVideo.id.videoId}`); // Query String
              }}
            />
          </VideoList>
        </InfiniteScroll>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    query: state.vidoes.query
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateQuery
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);