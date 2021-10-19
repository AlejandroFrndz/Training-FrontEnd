import React from 'react';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import { Character } from '../../redux/types';

interface Props {
  character: Character;
}

const CharacterPreview: React.FC<Props> = (props) => {
  const {
    character: { name, image, status, id, gender }
  } = props;
  let wordBreak = false;
  const splitName = name.split(' ');
  const { t } = useTranslation('common');

  for (const str of splitName) {
    if (str.length >= 12) {
      wordBreak = true;
      break;
    }
  }

  return (
    <div className={`${styles.charPreview} container`}>
      <div className="row">
        <div className="col-12">
          <h2 className={`text-center ${wordBreak ? 'text-break' : ''}`}>
            {name}
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <img
            className={`${styles.flexImg} text-center rounded`}
            src={image}
            alt={`${name}'s face`}
          />
        </div>
      </div>
      <div className={`row ${styles.mt}`}>
        <div className="col-12 text-center">
          <button
            id={status === 'Alive' ? styles.aliveLight : styles.deadLight}
            type="button"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center mt-2">
          <h4 className="fst-italic" id={`character_${id}_status`}>
            {t(`characterInfo.status.${status}`, { context: gender })}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CharacterPreview;
