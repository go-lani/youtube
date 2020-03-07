import React from 'react';
import './SearchBar.css';
import { updateQuery } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

const SearchBar = ({ query, onSearchVideos, history }) => {
  let input;
  return (
    <div className="search-area">
      <input
        ref={ref => (input = ref)}
        type="search"
        defaultValue={query || ''}
        onChange={e => history.push(`/result?search_query=${e.target.value}`)}
        onKeyPress={e => history.push(`/result?search_query=${e.target.value}`)}
        className="search-ipt"
        placeholder="검색어를 입력해주세요"
      />
      <button
        type="button"
        className="search-btn"
        onClick={() => onSearchVideos(input.value)}
      >
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          className="search-icon"
        >
          <g>
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </g>
        </svg>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    query: state.vidoes.query,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateQuery,
    },
    dispatch,
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar),
);
