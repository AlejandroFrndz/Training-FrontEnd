import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import CharactersContainer from './containers/Characters.container';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCharacters,
  getImmortalCharacter
} from './redux/actions/charactersActions';
import { State } from './redux/reducers/rootReducer';
import Header from './components/Header/Header.component';
import AddCharacterContainer from './containers/AddCharacter.container';
import { useTranslation } from 'react-i18next';
import Loader from 'react-loader-spinner';
import EpisodesListContainer from './containers/EpisodesList.container';
import HomeContainer from './containers/Home.container';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation('common');

  const loadingGet = useSelector((state: State) => state.characters.loadingGet);
  const errorGet = useSelector((state: State) => state.characters.errorGet);

  /*
  const errorUpdate = useSelector(
    (state: State) => state.characters.errorUpdate
  );
  */

  useEffect(() => {
    dispatch(getCharacters());
    dispatch(getImmortalCharacter());
  }, []);

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
          <HomeContainer />
        </Route>

        <Route exact path="/characters/:id?">
          {errorGet ? (
            <h1>{t('warnings.apiError')}</h1>
          ) : (
            <CharactersContainer />
          )}
        </Route>

        <Route exact path="/add">
          <AddCharacterContainer />
        </Route>

        <Route exact path="/episodes">
          <EpisodesListContainer />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
