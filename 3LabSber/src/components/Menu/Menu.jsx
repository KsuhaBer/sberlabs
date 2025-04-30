import { NavLink } from 'react-router-dom';
import './Menu.css';

export default function Menu() {
  return (
    <nav className="menu">
      <h3>Меню:</h3>
      <ul>
        <li>
          <NavLink to="/lab1" className={({isActive}) => isActive ? "active" : ""}>
            Лаб. работа 1
          </NavLink>
        </li>
        <li>
          <NavLink to="/lab2" className={({isActive}) => isActive ? "active" : ""}>
            Лаб. работа 2
          </NavLink>
        </li>
        <li>
          <NavLink to="/lab3" className={({isActive}) => isActive ? "active" : ""}>
            Лаб. работа 3
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}