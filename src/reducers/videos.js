import { UPDATE_QUERY, LIKE, UNLIKE } from '../actions';

const INITIAL_STATE = {
  query: '',
  data: {}
};

// 객체일 경우 - 요소를 덮어써야되는 경우
// 배열일 경우 - 요소가 추가되어야되는 경우

export default function videos(state = INITIAL_STATE, action) {
  const video = state.data[action.id];
  switch (action.type) {
    case UPDATE_QUERY:
      return {
        ...state,
        query: action.query
      };
    case LIKE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...video,
            like: video ? video.like + 1 : 1
          }
        }
      };
    case UNLIKE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...video,
            unlike: video ? video.unlike + 1 : 1
          }
        }
      };
    default:
      return state;
  }
}
