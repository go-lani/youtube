export const UPDATE_QUERY = 'UPDATE_QUERY';
export const SELECTED_VIDEO = 'SELECTED_VIDEO';
export const LIKE = 'LIKE';
export const UNLIKE = 'UNLIKE';

export const updateQuery = query => {
  return { type: UPDATE_QUERY, query };
};

export const selectedVideo = (title, description) => {
  return { type: SELECTED_VIDEO, title, description };
};

export const like = id => {
  return { type: LIKE, id };
};

export const unLike = id => {
  return { type: UNLIKE, id };
};
