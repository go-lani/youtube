import React, { Component } from 'react';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    };
    this.searchVideo = this.searchVideo.bind(this);
  }

  async getYoutubeData(query = '여행') {
    try {
      const data = await Axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA&q=${query}&part=snippet`); // 실제 데이터
      this.setState({data: data.data});
    } catch(e) {
      console.error(e);
    }
  }

  componentDidMount() {
    this.getYoutubeData();
  }

  searchVideo({ target, keyCode }) {
    const value = target.value.trim();

    if (value === '' || keyCode !== 13) return;

    this.getYoutubeData(value);
  }

  render() {
    console.log('render', this.state.data);
    return (
      <>
        <div className="App">
          <input type="text" onKeyUp={this.searchVideo} />
        </div>
      </>
    );
  }
}
  export default App;
