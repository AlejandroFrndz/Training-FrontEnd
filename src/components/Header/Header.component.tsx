import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import styles from './styles.module.css';
import HomeIcon from '../../assets/images/home-icon.jpg';
import HomeIconActive from '../../assets/images/home-icon-active.png';

const Header: React.FC = () => {
  return (
    <nav
      className={`navbar navbar-dark ${styles.bgDark} mb-2 justify-content-between flex-row`}
    >
      <NavLink
        exact
        to={'/'}
        className={`${styles.homeContainer} nav-brand ms-4 text-white font-weight-bold text-decoration-none`}
        data-testid="toHome"
      >
        <Switch>
          <Route exact path="/">
            <img
              src={HomeIconActive}
              className={`${styles.homeIcon}`}
              data-testid="activeHomeIcon"
            />
          </Route>
          <Route path="/">
            <img
              src={HomeIcon}
              className={`${styles.homeIcon}`}
              data-testid="inactiveHomeIcon"
            />
          </Route>
        </Switch>
      </NavLink>

      <NavLink
        to={'/characters'}
        className="nav-item text-white font-weight-bold text-decoration-none p-2"
        activeClassName={styles.active}
        data-testid="toCharacters"
      >
        <h4>Characters</h4>
      </NavLink>

      <NavLink
        to={'/add'}
        className="nav-item me-4 text-white font-weight-bold text-decoration-none p-2"
        activeClassName={styles.active}
        data-testid="toAdd"
      >
        <h4>Add</h4>
      </NavLink>
    </nav>
  );
};

export default Header;
