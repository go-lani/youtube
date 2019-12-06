import React, { Component } from 'react';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  async getYoutubeData(query = '여행') {
    const data = await Axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA&q=${query}&part=snippet`); // 실제 데이터
    this.setState({ data });
    console.log(data);
  }

  componentDidMount() {
    this.getYoutubeData();
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}
  export default App;
