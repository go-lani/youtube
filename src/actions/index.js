export const UPDATE_QUERY = 'UPDATE_QUERY';
export const LIKE = 'LIKE';

export const updateQuery = query => {
  return { type: UPDATE_QUERY, query };
};

export const like = id => {
  return { type: LIKE, id };
};
