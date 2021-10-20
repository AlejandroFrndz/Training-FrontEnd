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
  deleteCharacter,
  getImmortalCharacter
} from './redux/actions/charactersActions';
import { State } from './redux/reducers/rootReducer';
import Header from './components/Header/Header.component';
import AddCharacterContainer from './containers/AddCharacter.container';
import { Character, NewCharacter } from './redux/types';
import { useTranslation } from 'react-i18next';
import Home from './components/Home/Home.component';
import Loader from 'react-loader-spinner';
import EpisodesListContainer from './containers/EpisodesList.container';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation('common');

  const characters = useSelector((state: State) => state.characters.characters);
  const loadingGet = useSelector((state: State) => state.characters.loadingGet);
  const errorGet = useSelector((state: State) => state.characters.errorGet);
  const immortalCharacter = useSelector(
    (state: State) => state.characters.immortalCharacter
  );

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
    dispatch(getImmortalCharacter());
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

  if (loadingGet) {
    return (
      <Router>
        <Header />
        <Loader type="TailSpin" />;
      </Router>
    );
  }

  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/">
          <Home
            character={characters.filter((e) => e.id === immortalCharacter)[0]}
          />
        </Route>

        <Route exact path="/characters">
          {errorGet ? (
            <h1>{t('warnings.apiError')}</h1>
          ) : (
            <CharactersContainer
              characters={characters}
              loadingKill={loadingUpdate}
              onKill={onKillCharacter}
              onDelete={onDeleteCharacter}
            />
          )}
        </Route>

        <Route path="/characters/:id">
          {errorGet ? (
            <h1>{t('warnings.apiError')}</h1>
          ) : (
            <CharactersContainer
              characters={characters}
              loadingKill={loadingUpdate}
              onKill={onKillCharacter}
              onDelete={onDeleteCharacter}
            />
          )}
        </Route>

        <Route exact path="/add">
          <AddCharacterContainer onAddCharacter={onAddCharacter} />
        </Route>

        <Route exact path="/episodes">
          <EpisodesListContainer />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
