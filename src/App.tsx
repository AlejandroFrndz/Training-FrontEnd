import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillHome as HomeIcon } from 'react-icons/ai';
import CharacterService from './services/characters.service';
import CharacterData from './types/character.type';
import { useState, useEffect } from 'react';
import CharactersContainer from './containers/Characters.container';
import { useDispatch, useSelector } from 'react-redux';
import {
  increaseAmount,
  getCharacters,
  updateCharacter
} from './redux/actions/charactersActions';
import { State } from './redux/reducers/rootReducer';

const App: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingKill, setLoadingKill] = useState<boolean>(false);

  const dispatch = useDispatch();
  const amount = useSelector((state: State) => state.characters.characters);
  const characters = useSelector((state: State) => state.characters.characters);

  useEffect(() => {
    dispatch(getCharacters());
    setLoading(false);
  }, []);

  const onKillCharacter = async (character: CharacterData) => {
    setLoadingKill(true);
    if (character.status === 'Alive') {
      character.status = 'Dead';
    } else {
      character.status = 'Alive';
    }

    dispatch(updateCharacter(character));
    setLoadingKill(false);
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
          {error ? (
            <h1>
              Couldn&apos;t get characters from server. Please try reloading the
              page
            </h1>
          ) : (
            <CharactersContainer
              characters={characters}
              loading={loading}
              loadingKill={loadingKill}
              onKill={onKillCharacter}
            />
          )}
        </Route>

        <Route path="/characters/:id">
          {error ? (
            <h1>
              Couldn&apos;t get characters from server. Please try reloading the
              page
            </h1>
          ) : (
            <CharactersContainer
              characters={characters}
              loading={loading}
              loadingKill={loadingKill}
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
