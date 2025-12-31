import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

Portal.propTypes = {
  children: PropTypes.element,
};

export default Portal;
