import { UPDATE_QUERY } from '../actions';

const INITIAL_STATE = {
  query: ''
};

export default function videos(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return {
        ...state,
        query: action.query
      }
    default:
      return state
  }
}