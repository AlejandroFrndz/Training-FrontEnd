import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/i18n';
import CharacterList from '../../../components/CharactersList/CharactersList.component';

describe('<CharacterList />', () => {
  const onGoBack = jest.fn();
  const characters = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Dead',
      species: 'Human',
      type: '',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
    }
  ];

  const history = createMemoryHistory();

  test('If the characters array is empty, it should display appropiate message', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <CharacterList characters={[]} onGoBack={onGoBack} />
      </I18nextProvider>
    );
    const div = screen.getByTestId('innerDiv');
    expect(div).toHaveTextContent('No characters in record');
  });

  test('Characters are properly displayed', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Router history={history}>
          <CharacterList characters={characters} onGoBack={onGoBack} />
        </Router>
      </I18nextProvider>
    );
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('id', 'deadLight');
    expect(buttons[1]).toHaveAttribute('id', 'aliveLight');
  });

  test('Navigation to character detail works', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Router history={history}>
          <CharacterList characters={characters} onGoBack={onGoBack} />
        </Router>
      </I18nextProvider>
    );

    userEvent.click(screen.getByText('Rick Sanchez'));
    expect(history.location.pathname).toBe('/characters/1');

    userEvent.click(screen.getByText('Morty Smith'));
    expect(history.location.pathname).toBe('/characters/2');
  });
});
