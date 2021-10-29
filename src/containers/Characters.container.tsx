import React from 'react';
import { Character } from '../redux/types';
import CharacterDetail from '../components/CharacterDetail/CharacterDetail.component';
import { useParams, useHistory } from 'react-router-dom';
import CharactersList from '../components/CharactersList/CharactersList.component';
import { State } from '../redux/reducers/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteCharacter,
  updateCharacter
} from '../redux/actions/charactersActions';

interface Params {
  id: string;
}

const CharactersContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<Params>();
  const history = useHistory();
  const immortalId = useSelector(
    (state: State) => state.characters.immortalCharacter
  );
  const loadingKill = useSelector(
    (state: State) => state.characters.loadingUpdate
  );
  const characters = useSelector((state: State) => state.characters.characters);

  const onGoBack = () => {
    history.goBack();
  };

  const onKill = async (character: Character) => {
    if (character.status === 'Alive') {
      character.status = 'Dead';
    } else {
      character.status = 'Alive';
    }

    dispatch(updateCharacter(character));
  };

  const onDelete = async (id: number) => {
    dispatch(deleteCharacter(id));
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
          allowVaporize={!(Number(id) === immortalId)}
        />
      );
    } else {
      history.push('/characters');
    }
  }

  return <CharactersList characters={characters} onGoBack={onGoBack} />;
};

export default CharactersContainer;
