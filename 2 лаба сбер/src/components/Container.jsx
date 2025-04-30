import PropTypes from 'prop-types';
import './Container.css';

function Container({ children, title }) {
  return (
    <div className="container">
      {title && <h2 className="container-title">{title}</h2>}
      <div className="container-content">{children}</div>
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Container;