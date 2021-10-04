import React from 'react';
import CharacterData from '../types/character.type';
import CharacterDetail from '../components/CharacterDetail/CharacterDetail.component';
import { useParams, useHistory } from 'react-router-dom';
import CharactersList from '../components/CharactersList/CharactersList.component';
import Loader from 'react-loader-spinner';

interface Props {
  characters: CharacterData[];
  loading: boolean;
  loadingKill: boolean;
  onKill: (character: CharacterData) => Promise<void>;
}

interface Params {
  id: string;
}

const CharactersContainer: React.FC<Props> = (props) => {
  const { characters, loading, loadingKill, onKill } = props;
  const { id } = useParams<Params>();
  const history = useHistory();

  if (loading) {
    return <Loader type="TailSpin" />;
  }

  const onGoBack = () => {
    history.goBack();
  };

  if (id) {
    let character;
    for (const item of characters) {
      if (item.id === Number(id)) {
        character = item;
        break;
      }
    }

    if (typeof character !== 'undefined') {
      return (
        <CharacterDetail
          character={character}
          onGoBack={onGoBack}
          onKill={onKill}
          loadingKill={loadingKill}
        />
      );
    } else {
      history.push('/characters');
      return <></>;
    }
  } else {
    return <CharactersList characters={characters} onGoBack={onGoBack} />;
  }
};

export default CharactersContainer;
