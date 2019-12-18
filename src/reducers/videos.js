import { UPDATE_QUERY } from '../actions';

const INITIAL_STATE = {
  query: ''
};

export default function videos(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return {
        query: action.query
      } // 스위치에서 는 무조건 state를 리턴해줘야한다.

    default:
      return state
  }
}