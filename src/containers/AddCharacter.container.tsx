import React, { useState } from 'react';
import { useHistory } from 'react-router';
import AddCharacter from '../components/AddCharacter/AddCharacter.component';
import { Character } from '../redux/types';
import { useDispatch } from 'react-redux';
import { createCharacter } from '../redux/actions/charactersActions';

const AddCharacterContainer: React.FC = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Alive');
  const [species, setSpecies] = useState('Unknown');
  const [gender, setGender] = useState('Unknown');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (character: Character) => {
    dispatch(createCharacter(character));

    history.push('/characters');
  };

  return (
    <>
      <AddCharacter
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
        status={status}
        setStatus={setStatus}
        species={species}
        setSpecies={setSpecies}
        gender={gender}
        setGender={setGender}
        image={image}
        setImage={setImage}
      />
    </>
  );
};

export default AddCharacterContainer;
