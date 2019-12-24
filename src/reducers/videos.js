import { UPDATE_QUERY, LIKE, DISLIKE, ADD_COMMENT, REMOVE_COMMENT } from '../actions';

const INITIAL_STATE = {
  query: '',
  data: {},
  selected: {},
};

export default function videos(state = INITIAL_STATE, action) {
  const video = state.data[action.id];
  switch (action.type) {
    case UPDATE_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case LIKE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...video,
            like: video && video.like ? video.like + 1 : 1,
          },
        },
      };
    case DISLIKE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...video,
            dislike: video && video.dislike ? video.dislike + 1 : 1,
          },
        },
      };
    case ADD_COMMENT:
      let maxId = video && video.comment ? Math.max(...video.comment.map(item => item.id)) + 1 : 0;
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...video,
            comment:
              video && video.comment
                ? [{ id: maxId, comment: action.value }, ...video.comment]
                : [{ id: maxId, comment: action.value }],
          },
        },
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...video,
            comment: video.comment.filter(comment => comment.id !== action.commentId),
          },
        },
      };
    default:
      return state;
  }
}
