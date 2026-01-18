import { SET_IS_COLLAPSED, SET_SHOW_SIZES, SET_THEME, SET_SHOW_PAGE_INFO } from './actions';

const reducer = (state, action) => {
  const { type, data } = action;

  switch (type) {
    case SET_THEME:
      return { ...state, ...data };
    case SET_SHOW_SIZES:
      return { ...state, ...data };
    case SET_IS_COLLAPSED:
      return { ...state, ...data };
    case SET_SHOW_PAGE_INFO:
      return { ...state, ...data };
    default:
      throw new Error('Invalid action');
  }
};

export default reducer;
