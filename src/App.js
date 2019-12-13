import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoListItem from './components/VideoList/VideoListItem';
import VideoPlayer from './components/VideoPlayer';
import spinner from './components/images/spinner.gif';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props); // 상위 컴포넌트의 constructor의 모든 것을 가져온다. 상위 컴포넌트의 constructor에는 state도 있고 setState도 있다.
    this.state = {
      videos: [],
      selectedVideo: null,
      query: '',
      nextPageToken: null
    };

    this.defaultState = this.state;
    // this.add = this.add.bind(this)
    // this.state와 this.setState를 사용하기 위해서 bind 해준다.
    Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this));
    // ['add' , 'getYou...'].forEach(key => React.Component[React.Component] = React.Component['add'].bind('React.Component'));
  }

  // this = APP
  async getYoutubeData(query) {
    if (!query) return;
    if (this.state.query !== query) {
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
    // render 이전
    // DidMount와 많이 차이는 없지만 주로 setState의 초기값을 지정해주고 싶을때 사용
    this.getYoutubeData('여행');
  }

  render() {
    // 랜더전에 비구조화로 선언을 하면 this.를 안붙여도 되게된다.
    const { selectedVideo } = this.state;

    return (
      <div className="App">
        <Header>
          <SearchBar onSearchVideos={debounce(this.getYoutubeData, 500)}/>
        </Header>
        {
          selectedVideo
          ? <VideoPlayer selectedVideo={this.state.selectedVideo} />
          : <InfiniteScroll
              loadMore={() => this.getYoutubeData(this.state.query)}
              // 스크롤이 끝까지 내려지면 사용할 메소드를 써야되고 파라미터가 없더라도 arrow function으로 써야된다.
              // 다음페이지에 데이터만 추가하면 되는 것이기에 기존 상태의 쿼리를 파라미터로 넘겨주는 것이다.
              hasMore={!!this.state.nextPageToken}
              loader={
                <div key={uuid.v4()} className="loader">
                  <img src={spinner} alt="loading" />
                </div>
              }>
              <VideoList>
                <VideoListItem
                  videoInfo={this.state.videos}
                  onVideoSelect={(selectedVideo) => this.setState({ selectedVideo })}
                />
              </VideoList>
            </InfiniteScroll>
        }
      </div>
    );
  }
}
  export default App;
