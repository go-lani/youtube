import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


// Stateless component

// state가 없이 props를 가지고 전달해주는 경우
// const Img = props => <img src={logo} className={props.className} alt="logo" />
// 이떄 className은 11번째 줄의 props를 받는다

// const Header = props => <header>
//   <Img src={logo} className={props.className} />
// </header>
// 모든 속성들을 props.children은 예약어로서 해당된 커스텀 컴포넌트의 하위 요소들을 받는다
// props 안에는 타입과 해당 요소의 property, 그리고 children 요소들이 배열로 담겨있다.

class App extends Component {
  constructor(props) {
    super(props) // super를 이용해서 React.Component의 this를 사용하기 위해서이다.
    this.state = {
      counter: 0,
      className: 'App-header'
    } // 초기화, React.Component에 있는 state이다.

    // this.add = this.add.bind(this) 만약 add로 정의한 함수 정의형 함수라면 해당 함수안의 this.setState가 현재 부모 클래스를 받고있기 때문에 Class App을 바인딩해준다.
    // this.minus = this.minus.bind(this)

    Object.keys(this).forEach(key => {
      if (typeof this[key] === 'function') {
        this[key] = this[key].bind(this);
      }
    }) // this 객체에 키들을 배열로 만들어준다. this[key] 값이 function 이라면 bind this를 해준다.
  }

  componentDidMount () { // render함수 이후에 실행이 된다.
    setInterval(() => this.setState({
      // counter: ++this.state.counter 상태까지 직접 변화기때문에 사용하면 안된다.
      counter: this.state.counter + 1 // 현재상태를 불러와서 + 1씩 해준다.
    }), 1000);  // 상태에 변화를 주고 싶으면 무조건 setState메소드를 사용한다. 객체를 받고, 업데이트할 프로퍼티의 프로퍼티명과 값을 넣어주면 된다.

    // this.setState({counter: 1}, () => {
    // }) setState 메소드는 비동기 메소드이다, setState 메소드는 콜백을 받을 수 있다, 업데이트된 이후의 값을 사용하려면 콜백을 사용하면된다.
  }

  add (val) {
    this.setState({ counter: this.state.counter + val })
  }

  minus (val) {
    this.setState({ counter: this.state.counter - val })
  }

  render () {
    return (
      <div className="App">
        <button onClick={() => this.add(100)}>+</button>{this.state.counter}<button onClick={() => this.minus(100)}>-</button>
      </div>
    );
  }
}

export default App;
