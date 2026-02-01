export const SET_SHOW_PAGE_INFO = 'SET_SHOW_PAGE_INFO';
export const SET_THEME = 'SET_THEME';
export const SET_SHOW_SIZES = 'SET_SHOW_SIZES';
export const SET_IS_COLLAPSED = 'SET_IS_COLLAPSED';
export const SET_IS_INIT = 'SET_IS_INIT';
export const SET_APP_DATA = 'SET_APP_DATA';
export const SET_SHOW_MESSAGE = 'SET_SHOW_MESSAGE';
export const TOGGLE_EXPANDED_PATH = 'TOGGLE_EXPANDED_PATH';
export const SET_EXPANDED_PATHS = 'SET_EXPANDED_PATHS';
export const SET_IS_SEARCHING = 'SET_IS_SEARCHING';

export const SetTheme = (payload) => {
  return {
    type: SET_THEME,
    data: {
      theme: payload,
    },
  };
};

export const SetShowSizes = (payload) => {
  return {
    type: SET_SHOW_SIZES,
    data: {
      showSizes: payload,
    },
  };
};

export const SetIsCollapsed = (payload) => {
  return {
    type: SET_IS_COLLAPSED,
    data: {
      isCollapsed: payload,
    },
  };
};

export const SetIsInit = (payload) => {
  return {
    type: SET_IS_INIT,
    data: {
      isInit: payload,
    },
  };
};

export const SetShowPageInfo = (payload) => {
  return {
    type: SET_SHOW_PAGE_INFO,
    data: {
      showPageInfo: payload,
    },
  };
};

export const SetAppData = (payload) => {
  return {
    type: SET_APP_DATA,
    data: {
      appData: payload,
    },
  };
};

export const SetShowMessage = (payload) => {
  return {
    type: SET_SHOW_MESSAGE,
    data: {
      showMessage: payload,
    },
  };
};

export const ToggleExpandedPath = (path) => {
  return {
    type: TOGGLE_EXPANDED_PATH,
    path,
  };
};

export const SetExpandedPaths = (paths) => {
  return {
    type: SET_EXPANDED_PATHS,
    data: {
      expandedPaths: paths,
    },
  };
};

export const SetIsSearching = (payload) => {
  return {
    type: SET_IS_SEARCHING,
    data: {
      isSearching: payload,
    },
  };
};
