import {
  SET_IS_COLLAPSED,
  SET_SHOW_SIZES,
  SET_THEME,
  SET_SHOW_PAGE_INFO,
  SET_IS_INIT,
  SET_APP_DATA,
  SET_SHOW_MESSAGE,
  TOGGLE_EXPANDED_PATH,
  SET_EXPANDED_PATHS,
  SET_IS_SEARCHING,
} from './actions';

const reducer = (state, action) => {
  const { type, data, path } = action;

  switch (type) {
    case SET_THEME:
    case SET_SHOW_SIZES:
    case SET_IS_COLLAPSED:
    case SET_SHOW_PAGE_INFO:
    case SET_IS_INIT:
    case SET_APP_DATA:
    case SET_SHOW_MESSAGE:
    case SET_EXPANDED_PATHS:
    case SET_IS_SEARCHING:
      return { ...state, ...data };
    case TOGGLE_EXPANDED_PATH: {
      const newPaths = new Set(state.expandedPaths);
      if (newPaths.has(path)) {
        newPaths.delete(path);
      } else {
        newPaths.add(path);
      }
      return { ...state, expandedPaths: newPaths };
    }
    default:
      throw new Error('Invalid action');
  }
};

export default reducer;
