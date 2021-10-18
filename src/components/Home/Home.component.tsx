import React from 'react';
import { Character } from '../../redux/types';
import { useTranslation } from 'react-i18next';

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
    <div>
      <h1>{t('warnings.immortalCharacterText')}</h1>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name + "'s face"} />
      <h3>{t('warnings.immortalCharacterSubtext')}</h3>
    </div>
  );
};

export default Home;
