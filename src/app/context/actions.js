export const SET_THEME = "SET_THEME";
export const SET_SHOW_SIZES = "SET_SHOW_SIZES";
export const SET_IS_COLLAPSED = "SET_IS_COLLAPSED";

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
