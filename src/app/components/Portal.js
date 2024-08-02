import ReactDOM from 'react-dom';

const PortalComponent = ({ children }) => {
    return ReactDOM.createPortal(
        children,
        document.body
    );
};

export default PortalComponent;