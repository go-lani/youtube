import { UPDATE_QUERY, LIKE } from '../actions';

const INITIAL_STATE = {
  query: '',
  data: [
    {
      dwqdwqd: {
        count: 0
      }
    }
  ]
};

// 객체일 경우 - 요소를 덮어써야되는 경우
// 배열일 경우 - 요소가 추가되어야되는 경우

export default function videos(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return {
        ...state,
        query: action.query
      };
    case LIKE:
      return {
        ...state,
        data: [
          ...state.data,
          {
            [action.id]: {
              count: [action.id] ? ([action.id].count += 1) : 0
            }
          }
        ]
      };
    default:
      return state;
  }
}
