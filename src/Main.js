import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import { withRouter } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoListItem from './components/VideoList/VideoListItem';
import VideoPlayer from './components/VideoPlayer';
import spinner from './components/images/spinner.gif';
import './App.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      query: '',
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
    if (this.state.query !== query) {
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
        query,
        nextPageToken: data.nextPageToken
      });
    } catch(err) {
      console.error(err);
    }
  }

  async componentWillMount() {
    this.getYoutubeData('여행');
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
              onVideoSelect={selectedVideo => this.props.history.push(`/watch/${selectedVideo.id.videoId}`)}
            />
          </VideoList>
        </InfiniteScroll>
        }
      </div>
    );
  }
}
  export default withRouter(Main);
