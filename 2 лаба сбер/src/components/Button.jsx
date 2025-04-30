import PropTypes from 'prop-types';
import './Button.css';

function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button 
      className={`button ${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
};

export default Button;