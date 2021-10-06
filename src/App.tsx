import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillHome as HomeIcon } from 'react-icons/ai';
import CharacterData from './types/character.type';
import { useEffect } from 'react';
import CharactersContainer from './containers/Characters.container';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCharacters,
  updateCharacter
} from './redux/actions/charactersActions';
import { State } from './redux/reducers/rootReducer';

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

  const onKillCharacter = async (character: CharacterData) => {
    if (character.status === 'Alive') {
      character.status = 'Dead';
    } else {
      character.status = 'Alive';
    }

    dispatch(updateCharacter(character));
  };

  return (
    <Router>
      <nav className="navbar">
        <NavLink to={'/'}>
          <HomeIcon />
        </NavLink>

        <NavLink to={'/characters'}>
          <h4>Characters</h4>
        </NavLink>

        <NavLink to={'/add'}>
          <h4>Add</h4>
        </NavLink>
      </nav>

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
            />
          )}
        </Route>

        <Route exact path="/add">
          <h1>ADD</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
