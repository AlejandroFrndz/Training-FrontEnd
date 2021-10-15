import React from 'react';
import { render } from '@testing-library/react';
import AddCharacter from '../../components/AddCharacter/AddCharacter.component';
import userEvent from '@testing-library/user-event';
import { NewCharacter } from '../../redux/types';

describe('<AddCharacter />', () => {
  const props = {
    handleSubmit: jest.fn((character: NewCharacter) => {
      character;
    }),
    name: 'Rick',
    setName: jest.fn(),
    status: 'Alive',
    setStatus: jest.fn(),
    species: 'Human',
    setSpecies: jest.fn(),
    gender: 'Male',
    setGender: jest.fn(),
    image: 'img-url',
    setImage: jest.fn()
  };

  let submitButton: HTMLElement;

  beforeAll(() => {
    const { getByRole } = render(
      <AddCharacter
        handleSubmit={props.handleSubmit}
        name={props.name}
        setName={props.setName}
        status={props.status}
        setStatus={props.setStatus}
        species={props.species}
        setSpecies={props.setSpecies}
        gender={props.gender}
        setGender={props.setGender}
        image={props.image}
        setImage={props.setImage}
      />
    );

    submitButton = getByRole('button');
  });

  test('Submit gets called with the correct values', () => {
    userEvent.click(submitButton);
    expect(props.handleSubmit).toHaveBeenCalledWith({
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'img-url',
      type: ''
    });
  });
});
