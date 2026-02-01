import PropTypes from 'prop-types';
import React from 'react';
import { THEME } from '../../helpers/constants';
import reducer from './reducer';

const InitialState = {
  /**
   * appData - Contains all Next.js application metadata and page data
   * Properties:
   * - nextjsVersion: string - Next.js framework version (e.g., "14.0.0")
   * - nextjsRouter: string - Router type: "app" (App Router) or "pages" (Pages Router)
   * - nextjsPageData: object - Page component props/data (props for Pages Router, component state for App Router)
   * - nextjsPagePath: string - Current page path (e.g., "/products/[id]")
   * - nextjsPageQuery: object - URL query parameters (Pages Router only)
   * - nextjsPageAssetPrefix: string - Asset prefix configuration
   * - reactVersion: string - React framework version (e.g., "18.2.0")
   * - pageDataKeys: number - Number of properties in page data
   * - pageDataSize: number - Size in bytes of page data
   */
  appData: {
    nextjsVersion: null,
    nextjsRouter: null,
    nextjsPageData: null,
    nextjsPagePath: null,
    nextjsPageQuery: null,
    nextjsPageAssetPrefix: null,
    reactVersion: null,
    pageDataKeys: null,
    pageDataSize: null,
  },

  expandedPaths: new Set(),

  theme: THEME.Dark,

  showSizes: false,
  showPageInfo: false,
  showMessage: {},

  isCollapsed: false,
  isInit: false,
  isSearching: false,
};

export const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, InitialState);
  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
