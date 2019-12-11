import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import spinner from './components/images/spinner.gif';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      query: '',
      nextPageToken: null
    };

    this.defaultState = this.state;

    Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this));
  }

  async getYoutubeData(query) {
    if (!query) return;
    if (this.state.query !== query) {
      this.setState(this.defaultState)
    }

    const { nextPageToken } = this.state;

    const params = {
      key: 'AIzaSyCCoK6VE_bGcRVZO1wK-5MEeJJHMcRDxs0',
      q: query,
      part: 'snippet',
      maxResults: 5,
      pageToken: nextPageToken,
    };

    try {
      const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });
      this.setState({
        videos: [...this.state.videos, ...data.items]
      });
    } catch(err) {
      console.error(err);
    }
  }

  async componentWillMount() {
    // render 이전
    // DidMount와 많이 차이는 없지만 주로 setState의 초기값을 지정해주고 싶을때 사용
    // this.getYoutubeData('여행');
  }

  setInput(input) {
    this.setState({ input })
  }

  render() {
    const { input } = this.state;
    return (
      <div className="App">
        <Header>
          <SearchBar input={input} setInput={this.setInput} onSearchVideos={debounce(this.getYoutubeData, 500)}/>
        </Header>

        {/* <InfiniteScroll
          loadMore={() => this.getYoutubeData(this.state.query)}
          hasMore={!!this.state.nextPageToken}
          loader={
            <div key={uuid.v4()} className="loader">
              <img src={spinner} alt="loading" />
            </div> */}
          {/* }> */}
          {/* 무한로딩으로 렌더링될 모든 컴포넌트가 들어올 수 있다 */}
          {
            !!this.state.videos && <VideoList {...this.state}/> // onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          }

        {/* </InfiniteScroll> */}
      </div>
    );
  }
}
  export default App;
