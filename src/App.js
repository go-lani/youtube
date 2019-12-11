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
    super(props);
    this.state = {
      videos: [],
      selectedVideoId: null,
      query: '',
      nextPageToken: null
    };

    // 화면전환시 초기화를 위해서 초기값을 저장해준다
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

  setVideo (id) {
    this.setState( { selectedVideoId : id })
  }

  render() {
    // 랜더전에 비구조화로 선언을 하면 this.를 안붙여도 되게된다.
    const { selectedVideoId } = this.state;

    return (
      <div className="App">
        <Header>
          <SearchBar onSearchVideos={debounce(this.getYoutubeData, 500)}/>
        </Header>
        {
          selectedVideoId
          ? <VideoPlayer videoId={selectedVideoId} />
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
                  onVideoSelect={(selectedVideoId) => this.setVideo(selectedVideoId)}
                />
              </VideoList>
              {/* {!!this.state.videos && <VideoList {...this.state} onVideoSelect={selectedVideoId => this.setState({selectedVideoId})}/>} */}
            </InfiniteScroll>
        }
      </div>
    );
  }
}
  export default App;
