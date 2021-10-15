import React from 'react';
import { Character } from '../redux/types';
import CharacterDetail from '../components/CharacterDetail/CharacterDetail.component';
import { useParams, useHistory } from 'react-router-dom';
import CharactersList from '../components/CharactersList/CharactersList.component';
import Loader from 'react-loader-spinner';

export interface Props {
  characters: Character[];
  loading: boolean;
  loadingKill: boolean;
  onKill: (character: Character) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

interface Params {
  id: string;
}

const CharactersContainer: React.FC<Props> = (props) => {
  const { characters, loading, loadingKill, onKill, onDelete } = props;
  const { id } = useParams<Params>();
  const history = useHistory();

  if (loading) {
    return <Loader type="TailSpin" />;
  }

  const onGoBack = () => {
    history.goBack();
  };

  if (id) {
    let character: Character | undefined;
    for (const item of characters) {
      if (item.id === Number(id)) {
        character = item;
        break;
      }
    }

    const handleDelete = async (id: number) => {
      await onDelete(id);
      history.push('./characters');
    };

    if (typeof character !== 'undefined') {
      return (
        <CharacterDetail
          character={character}
          onGoBack={onGoBack}
          onKill={onKill}
          loadingKill={loadingKill}
          onDelete={handleDelete}
        />
      );
    } else {
      history.push('/characters');
    }
  }

  return <CharactersList characters={characters} onGoBack={onGoBack} />;
};

export default CharactersContainer;
