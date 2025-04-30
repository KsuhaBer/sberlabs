import './Navbar.css';

function Navbar() {
  const handleDisabledClick = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <a href="#" className="navbar-link" onClick={handleDisabledClick}>Home</a>
        </li>
        <li className="navbar-item">
          <a href="#" className="navbar-link" onClick={handleDisabledClick}>About</a>
        </li>
        <li className="navbar-item">
          <a href="#" className="navbar-link" onClick={handleDisabledClick}>Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;