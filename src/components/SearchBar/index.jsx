import React from 'react';
import './SearchBar.css';

const SearchBar = props => {
  // HOC: High order component 두개 이상의 함수를 받아서 하나의 컴포넌트로 만드는 것
  const handleEnter = search => e => {
    // search = props.onSearchVideos search에 함수를 받는다.
    // props.onSearchVideos(e)와 동일하게 동작
    // e를 받는 props.onSearchVideos 함수가 되어 리턴된다.
    if (e.key === 'Enter') {
      search(e.target.value);
    }
  };

  let input; // 인풋 value를 가져오기 위해 변수를 선언
  return (
    <div className="search-area">
      <input
        ref={ref => (input = ref)} // ref는 해당하는 컴포넌트를 DOM 객체 처럼 참조하는 코드, input에 매개변수 ref(해당 가상DOM의 참조 값이)를 담아준다.
        type="search"
        onChange={e => props.onSearchVideos(e.target.value)}
        onKeyPress={handleEnter(props.onSearchVideos)}
        // High Order Component식이 아닌 것
        // onKeyPress={e => {
        //   if (e.key === 'Enter') {
        //     props.onSearchVideos(e.target.value);
        //   }

        // 3항식으로 풀어쓴 것
        //   e.key === 'Enter'
        //    ? props.onSearchVideos(e.target.value);
        //    : () => {}
        //   }
        // }}
        className="search-ipt"
        placeholder="검색어를 입력해주세요"
      />
      <button type="button" className="search-btn" onClick={() => props.onSearchVideos(input.value)}>
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          className="search-icon">
          <g>
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;