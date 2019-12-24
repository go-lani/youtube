export const UPDATE_QUERY = 'UPDATE_QUERY';
export const SELECTED_VIDEO = 'SELECTED_VIDEO';
export const LIKE = 'LIKE';
export const DISLIKE = 'DISLIKE';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const updateQuery = query => {
  return { type: UPDATE_QUERY, query };
};

export const selectedVideo = (title, description) => {
  return { type: SELECTED_VIDEO, title, description };
};

export const like = id => {
  return { type: LIKE, id };
};

export const disLike = id => {
  return { type: DISLIKE, id };
};

export const addComment = (id, value) => {
  return { type: ADD_COMMENT, id, value };
};

export const removeComment = (id, commentId) => {
  return { type: REMOVE_COMMENT, id, commentId };
};
