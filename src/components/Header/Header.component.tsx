import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import styles from './styles.module.css';
import HomeIcon from '../../assets/images/home-icon.jpg';
import HomeIconActive from '../../assets/images/home-icon-active.png';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  return (
    <nav
      className={`navbar navbar-dark ${styles.bgDark} mb-2 justify-content-between flex-row sticky-top`}
    >
      <NavLink
        exact
        to={'/'}
        className={`${styles.Home} nav-brand ms-4 text-white font-weight-bold text-decoration-none`}
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
        id="toCharacters"
      >
        <h4>{t('navbar.characters')}</h4>
      </NavLink>

      <NavLink
        to={'/add'}
        className="nav-item text-white font-weight-bold text-decoration-none p-2"
        activeClassName={styles.active}
        data-testid="toAdd"
        id="toAdd"
      >
        <h4>{t('navbar.add')}</h4>
      </NavLink>

      <div className={styles.flags + ' me-4'}>
        <img
          alt="Flag"
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${
            i18n.resolvedLanguage === 'es' ? 'GB' : 'ES'
          }.svg`}
          onClick={() => {
            i18n.resolvedLanguage === 'es'
              ? i18n.changeLanguage('en')
              : i18n.changeLanguage('es');
          }}
        />
      </div>
    </nav>
  );
};

export default Header;
