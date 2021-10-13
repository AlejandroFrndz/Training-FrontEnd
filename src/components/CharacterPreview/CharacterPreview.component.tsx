import React from 'react';
import styles from './styles.module.css';

interface Props {
  name: string;
  src: string;
  status: string;
  id: number;
}

const CharacterPreview: React.FC<Props> = (props) => {
  const { name, src, status, id } = props;
  let wordBreak = false;
  const splitName = name.split(' ');

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
            className={`${styles.flexImg} text-center`}
            src={src}
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
            {status}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CharacterPreview;
