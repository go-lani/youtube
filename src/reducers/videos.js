import { UPDATE_QUERY, SELECTED_VIDEO, LIKE, UNLIKE } from '../actions';

const INITIAL_STATE = {
  query: '',
  data: {},
  selected: {}
};

export default function videos(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return {
        ...state,
        query: action.query
      };
    case SELECTED_VIDEO:
      return {
        ...state,
        selected: {
          title: action.title,
          description: action.description
        }
      };
    case LIKE:
      const _like = state.data[action.id];
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ..._like,
            like: _like ? _like.like + 1 : 1,
            unlike: _like ? _like.unlike : 0
          }
        }
      };
    case UNLIKE:
      const _unlike = state.data[action.id];
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ..._unlike,
            like: _unlike ? _unlike.like : 0,
            unlike: _unlike ? _unlike.unlike + 1 : 1
          }
        }
      };
    // why?
    // case LIKE:
    //   const _like = state.data[action.id];
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       [action.id]: {
    //         ..._like,
    //         like: _like && _like.like ? _like.like + 1 : 1
    //       }
    //     }
    //   };
    // case UNLIKE:
    //   const _unlike = state.data[action.id];
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       [action.id]: {
    //         ..._unlike,
    //         unlike: _unlike && _unlike.unlike ? _unlike.unlike + 1 : 1
    //       }
    //     }
    //   };
    default:
      return state;
  }
}
