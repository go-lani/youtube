import React, { Component } from 'react';
import Nav from './components/Nav/Nav'
import SearchBar from './components/SearchBar/SearchBar'
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this))
  }

  async getYoutubeData(query) {
    const params = {
      key: '',
      q: query,
      part: 'snippet',
      maxResults: 10,
      // pageToken: nextPageToken,
    };

    try {
      const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', { params }); // 기본적인 api 주소를 입력하고, params를 별도로 입력해준다. 이때 params에는 post맨의 옵션과 같이쓴다.
      this.setState({ data });
    } catch(err) {
      console.error(err);
    }
  }

  render() {
    // this.state.data < 이렇게 map으로 써도 되는지?
    return (
      <div className="App">
        <Nav>
          <SearchBar />
        </Nav>
        {/* <VideoList /> */}
      </div>
    );
  }
}
  export default App;
