import React from 'react';
import { Character } from '../../redux/types';
import { useTranslation } from 'react-i18next';
import swal from 'sweetalert';
import styles from './styles.module.css';

export interface Props {
  character: Character;
  onGoBack: () => void;
  onKill: (character: Character) => Promise<void>;
  loadingKill: boolean;
  onDelete: (id: number) => Promise<void>;
  allowVaporize: boolean;
}

const CharacterDetail: React.FC<Props> = (props) => {
  const { character, onGoBack, onKill, loadingKill, onDelete, allowVaporize } =
    props;
  const { t } = useTranslation('common');

  const handleKill = () => {
    onKill(character);
  };

  const handleDelete = async () => {
    console.log(); // Needed while testing
    const confirm = await swal({
      title: t('warnings.vaporizeTitle'),
      text: t('warnings.vaporizeText'),
      icon: 'warning',
      buttons: {
        cancel: {
          text: t('buttons.spare'),
          value: null,
          visible: true,
          className: '',
          closeModal: true
        },
        confirm: {
          text: t('buttons.vaporize') + '!!!',
          value: true,
          visible: true,
          className: '',
          closeModal: true
        }
      }
    });

    if (confirm) {
      onDelete(character.id);
    }
  };

  return (
    <div className={`character container ${styles.charWrapper}`}>
      <div className="row">
        <h1 className="text-center">
          {t('characterInfo.name')}: {character.name}
        </h1>
      </div>
      <div className="row">
        <h2 className="text-center">
          {t('characterInfo.species.root')}:{' '}
          {t(`characterInfo.species.${character.species}`, {
            context: character.gender
          })}
        </h2>
      </div>
      <div className="row">
        <h3 className="text-center">
          {t('characterInfo.gender.root')}:{' '}
          {t(`characterInfo.gender.${character.gender}`)}
        </h3>
      </div>
      <div className="row">
        <p className="text-center">
          {t('characterInfo.status.root')}:{' '}
          {t(`characterInfo.status.${character.status}`, {
            context: character.gender
          })}
        </p>
      </div>
      <div className="row">
        <div className="col-12">
          <img
            src={character.image}
            alt={character.name + 'face'}
            className="img-fluid rounded mx-auto d-block"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-4" />
        <div className="col-4 text-center mt-3">
          <button
            type="button"
            disabled={loadingKill}
            onClick={handleKill}
            id="killButton"
            className={`me-2 btn ${
              character.status === 'Alive' ? 'btn-danger' : 'btn-success'
            }`}
          >
            {character.status === 'Alive' ? (
              <>{t('buttons.kill')}</>
            ) : (
              <>{t('buttons.revive')}</>
            )}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            id="deleteButton"
            disabled={!allowVaporize}
            className={`btn btn-warning ${!allowVaporize && styles.notAllowed}`}
            title={
              !allowVaporize
                ? t('warnings.immortalButtonTitle', {
                    context: character.gender
                  })
                : ''
            }
          >
            {t('buttons.vaporize')}
          </button>
        </div>
        <div className="col-4" />
      </div>
      <div className="row mt-4">
        <div className="col-12 text-center mb-3">
          <button onClick={onGoBack} id="goBackButton" className="btn btn-info">
            {t('buttons.goBack')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
