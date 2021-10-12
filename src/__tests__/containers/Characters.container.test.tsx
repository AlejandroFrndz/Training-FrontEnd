import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import CharactersContainer from '../../containers/Characters.container';
import { Character } from '../../redux/types';

describe('<CharactersContainer />', () => {
  let history: MemoryHistory;
  const onKill = jest.fn(async (character: Character) => {
    character;
  });
  const onDelete = jest.fn(async (id: number) => {
    id;
  });

  beforeEach(() => {
    history = createMemoryHistory();
  });

  test('If a character route and character data are provided, it should display the detail', () => {
    history.push('/characters/1');

    render(
      <Router history={history}>
        <Route path="/characters/:id">
          <CharactersContainer
            characters={[
              {
                id: 1,
                name: 'Rick Sanchez',
                status: 'Dead',
                species: 'Human',
                type: '',
                gender: 'Male',
                image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
              }
            ]}
            loading={false}
            loadingKill={false}
            onKill={onKill}
            onDelete={onDelete}
          />
        </Route>
      </Router>
    );

    expect(screen.getByText('Vaporize')).toBeInTheDocument();
  });

  test('If a character route is given but no character data is provided, it should go back and display the complete list', () => {
    history.push('/characters/2');

    render(
      <Router history={history}>
        <Route path="/characters/:id">
          <CharactersContainer
            characters={[
              {
                id: 1,
                name: 'Rick Sanchez',
                status: 'Dead',
                species: 'Human',
                type: '',
                gender: 'Male',
                image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
              }
            ]}
            loading={false}
            loadingKill={false}
            onKill={onKill}
            onDelete={onDelete}
          />
        </Route>
      </Router>
    );

    expect(screen.queryByText('Vaporize')).not.toBeInTheDocument();
    expect(history.location.pathname).toBe('/characters');
  });

  test('If in loading state, loading animation should be desplayed', async () => {
    const container = render(
      <Router history={history}>
        <CharactersContainer
          characters={[
            {
              id: 1,
              name: 'Rick Sanchez',
              status: 'Dead',
              species: 'Human',
              type: '',
              gender: 'Male',
              image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
            }
          ]}
          loading={true}
          loadingKill={false}
          onKill={onKill}
          onDelete={onDelete}
        />
      </Router>
    );

    expect(
      container.container.children
        .item(0)
        ?.children.item(0)
        ?.children.item(0) instanceof SVGElement
    ).toBeTruthy();
  });
});
