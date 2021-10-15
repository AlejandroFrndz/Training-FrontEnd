import React from 'react';
import { Character } from '../../redux/types';
import {
  AiOutlineExclamationCircle,
  AiOutlineCheckCircle
} from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import swal from 'sweetalert';

export interface Props {
  character: Character;
  onGoBack: () => void;
  onKill: (character: Character) => Promise<void>;
  loadingKill: boolean;
  onDelete: (id: number) => Promise<void>;
}

const CharacterDetail: React.FC<Props> = (props) => {
  const { character, onGoBack, onKill, loadingKill, onDelete } = props;
  const { t } = useTranslation('common');

  const handleKill = () => {
    onKill(character);
  };

  const handleDelete = async () => {
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
    <div className="character">
      <h1>
        {t('characterInfo.name')}: {character.name}
      </h1>
      <h2>
        {t('characterInfo.species.root')}:{' '}
        {t(`characterInfo.species.${character.species}`, {
          context: character.gender
        })}
      </h2>
      <h3>
        {t('characterInfo.gender.root')}:{' '}
        {t(`characterInfo.gender.${character.gender}`)}
      </h3>
      {character.status === 'Alive' ? (
        <AiOutlineCheckCircle />
      ) : (
        <AiOutlineExclamationCircle />
      )}
      <p>
        {t('characterInfo.status.root')}:{' '}
        {t(`characterInfo.status.${character.status}`, {
          context: character.gender
        })}
      </p>
      <button
        type="button"
        disabled={loadingKill}
        onClick={handleKill}
        id="killButton"
      >
        {character.status === 'Alive' ? (
          <>{t('buttons.kill')}</>
        ) : (
          <>{t('buttons.revive')}</>
        )}
      </button>
      <button type="button" onClick={handleDelete} id="deleteButton">
        {t('buttons.vaporize')}
      </button>
      <img src={character.image} alt={character.name + 'face'} />
      <button onClick={onGoBack} id="goBackButton">
        {t('buttons.goBack')}
      </button>
    </div>
  );
};

export default CharacterDetail;
