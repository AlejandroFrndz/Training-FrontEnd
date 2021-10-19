import React from 'react';
import { Character } from '../../redux/types';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import logo from '../../assets/images/main-logo.jpg';

export interface Props {
  character: Character | undefined;
}

const Home: React.FC<Props> = (props) => {
  const { character } = props;
  const { t } = useTranslation('common');

  if (character === undefined) {
    return (
      <div>
        <h1>{t('warnings.noImmortal')}</h1>
      </div>
    );
  }

  return (
    <div className="bg-black">
      <div className="container">
        <div className={`bg-black row ${styles.mtN2}`}>
          <div className="col-12 text-center">
            <img src={logo} alt="Main Logo" className={styles.logo} />
          </div>
        </div>
      </div>
      <div className={`container text-white pb-4 pt-4`}>
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">
              {t('warnings.immortalCharacterText')}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-4" />
          <div className="col-4">
            <h2 className={`text-center `}>{character.name}</h2>
          </div>
          <div className="col-4" />
        </div>
        <div className="row ">
          <div className="col-12">
            <img
              src={character.image}
              alt={character.name + "'s face"}
              className={`img-fluid rounded mx-auto d-block`}
            />
          </div>
        </div>
        <div className="row">
          <div className="col12">
            <h3 className="text-center">
              {t('warnings.immortalCharacterSubtext')}
            </h3>
          </div>
        </div>

        <div className={styles.glowing}></div>
      </div>
    </div>
  );
};

export default Home;
