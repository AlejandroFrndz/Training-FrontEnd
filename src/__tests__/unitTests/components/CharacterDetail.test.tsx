import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Character } from '../../../redux/types';
import CharacterDetail, {
  Props
} from '../../../components/CharacterDetail/CharacterDetail.component';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/i18n';

const customRender = (props: Props) => {
  render(
    <I18nextProvider i18n={i18n}>
      <CharacterDetail {...props} />
    </I18nextProvider>
  );
};

describe('<CharacterDetail />', () => {
  const onGoBack = jest.fn();
  const onKill = jest.fn(async (character: Character) => {
    character;
  });
  const onDelete = jest.fn(async (id: number) => {
    id;
  });

  const spy = jest.spyOn(console, 'log');

  let props: Props;

  beforeEach(() => {
    props = {
      character: {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Dead',
        species: 'Human',
        type: '',
        gender: 'Male',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
      },
      onGoBack: onGoBack,
      onKill: onKill,
      onDelete: onDelete,
      loadingKill: false,
      allowVaporize: true
    };
  });

  test('All elements are displayed', () => {
    customRender(props);

    expect(screen.getByText('Name: Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Status: Dead')).toBeInTheDocument();
    expect(screen.getByText('Revive')).toBeInTheDocument();
    expect(screen.getByText('Vaporize')).toBeInTheDocument();
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  test('Button functionality is correct', () => {
    customRender(props);

    userEvent.click(screen.getByText('Revive'));
    expect(onKill).toHaveBeenCalled();

    userEvent.click(screen.getByText('Vaporize'));
    expect(spy).toHaveBeenCalled();

    userEvent.click(screen.getByText('Go Back'));
    expect(onGoBack).toHaveBeenCalled();

    spy.mockClear();
  });

  test('If loadingKill is active, kill button should not be active', () => {
    props.loadingKill = true;
    customRender(props);

    userEvent.click(screen.getByText('Revive'));
    expect(onKill).not.toHaveBeenCalled();
  });

  test('If allowVaporize is false, vaporize button should not be active', () => {
    props.allowVaporize = false;

    customRender(props);

    userEvent.click(screen.getByText('Vaporize'));
    expect(onDelete).not.toHaveBeenCalled();
  });
});
