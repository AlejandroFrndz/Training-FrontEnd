import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Character } from '../../redux/types';
import { Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n';

import AddCharacterContainer from '../../containers/AddCharacter.container';

describe('<AddCharacterContainer />', () => {
  const onAddCharacter = jest.fn(async (character: Character) => {
    character;
  });

  const history = createMemoryHistory();

  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <Router history={history}>
          <AddCharacterContainer onAddCharacter={onAddCharacter} />
        </Router>
      </I18nextProvider>
    );
  });

  test('Default values are displayed correctly', () => {
    expect(screen.getByTestId('form')).toHaveFormValues({
      name: '',
      status: 'Alive',
      species: 'Unknown',
      gender: 'Unknown',
      image: ''
    });
  });

  test('Input elements update state correctly', () => {
    userEvent.type(screen.getByTestId('nameInput'), 'Rick');
    const speciesInput = screen.getByTestId('speciesInput') as HTMLInputElement;
    speciesInput.setSelectionRange(0, speciesInput.value.length);
    userEvent.type(speciesInput, 'Human');
    userEvent.type(screen.getByTestId('imageInput'), 'img-url');
    userEvent.click(screen.getByTestId('genderMaleInput'));
    userEvent.click(screen.getByTestId('statusDeadInput'));

    expect(screen.getByTestId('form')).toHaveFormValues({
      name: 'Rick',
      status: 'Dead',
      species: 'Human',
      gender: 'Male',
      image: 'img-url'
    });
  });

  test('Submission works as intended', () => {
    userEvent.click(screen.getByRole('button'));
    expect(onAddCharacter).toHaveBeenCalledWith({
      name: '',
      status: 'Alive',
      species: 'Unknown',
      gender: 'Unknown',
      image: '',
      type: ''
    });

    expect(history.location.pathname).toBe('/characters');
  });
});
