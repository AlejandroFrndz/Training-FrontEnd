import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Character } from '../../redux/types';
import CharacterDetail, {
  Props
} from '../../components/CharacterDetail/CharacterDetail.component';

describe('<CharacterDetail />', () => {
  const onGoBack = jest.fn();
  const onKill = jest.fn(async (character: Character) => {
    character;
  });
  const onDelete = jest.fn(async (id: number) => {
    id;
  });

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
      loadingKill: false
    };
  });

  test('All elements are displayed', () => {
    render(<CharacterDetail {...props} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Dead')).toBeInTheDocument();
    expect(screen.getByText('Revive')).toBeInTheDocument();
    expect(screen.getByText('Vaporize')).toBeInTheDocument();
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  test('Button functionality is correct', () => {
    render(<CharacterDetail {...props} />);

    userEvent.click(screen.getByText('Revive'));
    expect(onKill).toHaveBeenCalled();

    userEvent.click(screen.getByText('Vaporize'));
    expect(onDelete).toHaveBeenCalled();

    userEvent.click(screen.getByText('Go Back'));
    expect(onGoBack).toHaveBeenCalled();
  });

  test('If loadingKill is active, kill button should not be active', () => {
    props.loadingKill = true;
    render(<CharacterDetail {...props} />);

    userEvent.click(screen.getByText('Revive'));
    expect(onKill).not.toHaveBeenCalled();
  });
});
