export const UPDATE_QUERY = 'UPDATE_QUERY';

export function updateQuery(query) {
  return ({ type: UPDATE_QUERY,  query})
}