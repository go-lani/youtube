import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import spinner from './components/images/spinner.gif'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      query: '',
      nextPageToken: null
    };

    this.defaultState = this.state; // 초기화 스테이트를 저장한다(백업용)

    Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this));
  }

  async getYoutubeData(query) {
    if (!query) return;
    if (this.state.query !== query) {
      // 검색어가 바뀌면 기존 state를 초기화 한다, 초기화를 하는 이유는 검색 시 검색결과를 초기화 해야되기 때문이다.
      this.setState(this.defaultState)
    }

    const { nextPageToken } = this.state;

    const params = {
      key: 'AIzaSyCCoK6VE_bGcRVZO1wK-5MEeJJHMcRDxs0',
      q: query,
      part: 'snippet',
      maxResults: 10,
      pageToken: nextPageToken,
    };

    try {
      const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', { params }); // 기본적인 api 주소를 입력하고, params를 별도로 입력해준다. 이때 params에는 post맨의 옵션과 같이쓴다.
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
    this.getYoutubeData('여행');
  }

  setInput(input) {
    this.setState({ input })
  }

  render() {
    // this.state.data < 이렇게 map으로 써도 되는지?
    return (
      <div className="App">
        <Header>
          <SearchBar input={input} setInput={this.setInput} onSearchVideos={debounce(this.getYoutubeData, 1000)}/>
        </Header>
        <InfiniteScroll
          loadMore={() => this.getYoutubeData(this.state.query)}
          hasMore={!!this.state.nextPageToken}
          loader={
            <div key={uuid.v4()} className="loader">
              <img src={spinner} alt="loading" />
            </div>
          }>
          {/* 무한로딩으로 렌더링될 모든 컴포넌트가 들어올 수 있다 */}
          <VideoList
            {...this.state} // 모든 state를 props으로 넘긴다.
            onVideoSelect={selectedVideo => this.setState({ selectedVideo })} />
        </InfiniteScroll>
        {/* <VideoList /> */}
      </div>
    );
  }
}
  export default App;
