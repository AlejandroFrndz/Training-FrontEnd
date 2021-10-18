import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import CharactersContainer, {
  Props
} from '../../containers/Characters.container';
import { Character } from '../../redux/types';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

describe('<CharactersContainer />', () => {
  let history: MemoryHistory;
  const onKill = jest.fn(async (character: Character) => {
    character;
  });
  const onDelete = jest.fn(async (id: number) => {
    id;
  });
  let props: Props;

  beforeEach(() => {
    history = createMemoryHistory();
    props = {
      characters: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Dead',
          species: 'Human',
          type: '',
          gender: 'Male',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
        }
      ],
      loadingKill: false,
      onKill: onKill,
      onDelete: onDelete
    };
  });

  test('If a character route and character data are provided, it should display the detail', () => {
    history.push('/characters/1');

    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Router history={history}>
            <Route path="/characters/:id">
              <CharactersContainer {...props} />
            </Route>
          </Router>
        </I18nextProvider>
      </Provider>
    );

    expect(screen.getByText('Vaporize')).toBeInTheDocument();
  });

  test('If a character route is given but no character data is provided, it should go back and display the complete list', () => {
    history.push('/characters/2');

    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Router history={history}>
            <Route path="/characters/:id">
              <CharactersContainer {...props} />
            </Route>
          </Router>
        </I18nextProvider>
      </Provider>
    );

    expect(screen.queryByText('Vaporize')).not.toBeInTheDocument();
    expect(history.location.pathname).toBe('/characters');
  });
});
