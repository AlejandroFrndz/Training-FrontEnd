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
      loading: false,
      loadingKill: false,
      onKill: onKill,
      onDelete: onDelete
    };
  });

  test('If a character route and character data are provided, it should display the detail', () => {
    history.push('/characters/1');

    render(
      <I18nextProvider i18n={i18n}>
        <Router history={history}>
          <Route path="/characters/:id">
            <CharactersContainer {...props} />
          </Route>
        </Router>
      </I18nextProvider>
    );

    expect(screen.getByText('Vaporize')).toBeInTheDocument();
  });

  test('If a character route is given but no character data is provided, it should go back and display the complete list', () => {
    history.push('/characters/2');

    render(
      <I18nextProvider i18n={i18n}>
        <Router history={history}>
          <Route path="/characters/:id">
            <CharactersContainer {...props} />
          </Route>
        </Router>
      </I18nextProvider>
    );

    expect(screen.queryByText('Vaporize')).not.toBeInTheDocument();
    expect(history.location.pathname).toBe('/characters');
  });

  test('If in loading state, loading animation should be desplayed', async () => {
    props.loading = true;
    const container = render(
      <I18nextProvider i18n={i18n}>
        <Router history={history}>
          <CharactersContainer {...props} />
        </Router>
      </I18nextProvider>
    );

    expect(
      container.container.children
        .item(0)
        ?.children.item(0)
        ?.children.item(0) instanceof SVGElement
    ).toBeTruthy();
  });
});
