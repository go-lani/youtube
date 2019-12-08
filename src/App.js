import React, { Component } from 'react';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    };
    this.searchVideo = this.searchVideo.bind(this);
  }

  async getYoutubeData(query) {
    try {
      const data = await Axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA&q=${query}&part=snippet`); // 실제 데이터
      this.setState({ data: data.data.items });
      console.log(this.state.data);
    } catch(e) {
      console.error(e);
    }
  }

  searchVideo({ target, keyCode }) {
    const value = target.value.trim();

    if (value === '' || keyCode !== 13) return;

    this.getYoutubeData(value);

    target.value = '';
  }

  render() {
    // this.state.data < 이렇게 map으로 써도 되는지?
    return (
      <>
        <div className="App">
          <input type="text" onKeyUp={this.searchVideo} />
          <ul>
            {this.state.data.map(video => <li key={video.etag}>{video.snippet.title}</li>)}
          </ul>
        </div>
      </>
    );
  }
}
  export default App;
