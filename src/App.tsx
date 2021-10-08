import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import CharactersContainer from './containers/Characters.container';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCharacters,
  updateCharacter,
  createCharacter,
  deleteCharacter
} from './redux/actions/charactersActions';
import { State } from './redux/reducers/rootReducer';
import Header from './components/Header/Header.component';
import AddCharacterContainer from './containers/AddCharacter.container';
import { Character, NewCharacter } from './redux/types';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const characters = useSelector((state: State) => state.characters.characters);
  const loadingGet = useSelector((state: State) => state.characters.loadingGet);
  const errorGet = useSelector((state: State) => state.characters.errorGet);

  const loadingUpdate = useSelector(
    (state: State) => state.characters.loadingUpdate
  );

  /*
  const errorUpdate = useSelector(
    (state: State) => state.characters.errorUpdate
  );
  */

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  const onKillCharacter = async (character: Character) => {
    if (character.status === 'Alive') {
      character.status = 'Dead';
    } else {
      character.status = 'Alive';
    }

    dispatch(updateCharacter(character));
  };

  const onAddCharacter = async (character: NewCharacter) => {
    dispatch(createCharacter(character));
  };

  const onDeleteCharacter = async (id: number) => {
    dispatch(deleteCharacter(id));
  };

  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/">
          <h1>HOME</h1>
        </Route>

        <Route exact path="/characters">
          {errorGet ? (
            <h1>
              Couldn&apos;t get characters from server. Please try reloading the
              page
            </h1>
          ) : (
            <CharactersContainer
              characters={characters}
              loading={loadingGet}
              loadingKill={loadingUpdate}
              onKill={onKillCharacter}
              onDelete={onDeleteCharacter}
            />
          )}
        </Route>

        <Route path="/characters/:id">
          {errorGet ? (
            <h1>
              Couldn&apos;t get characters from server. Please try reloading the
              page
            </h1>
          ) : (
            <CharactersContainer
              characters={characters}
              loading={loadingGet}
              loadingKill={loadingUpdate}
              onKill={onKillCharacter}
              onDelete={onDeleteCharacter}
            />
          )}
        </Route>

        <Route exact path="/add">
          <AddCharacterContainer onAddCharacter={onAddCharacter} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
