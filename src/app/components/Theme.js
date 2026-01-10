import PropTypes from 'prop-types';

import useTheme from '../hooks/useTheme';

function Theme({ children }) {
  useTheme();
  return children;
}

Theme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Theme;
