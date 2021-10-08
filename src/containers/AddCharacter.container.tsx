import React, { useState } from 'react';
import { useHistory } from 'react-router';
import AddCharacter from '../components/AddCharacter/AddCharacter.component';
import { NewCharacter } from '../redux/types';

interface Props {
  onAddCharacter: (character: NewCharacter) => Promise<void>;
}

const AddCharacterContainer: React.FC<Props> = (props) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Alive');
  const [species, setSpecies] = useState('Unknown');
  const [gender, setGender] = useState('Unknown');
  const [image, setImage] = useState('');

  const { onAddCharacter } = props;
  const history = useHistory();

  const handleSubmit = (character: NewCharacter) => {
    onAddCharacter(character);
    history.push('/characters');
  };

  return (
    <>
      <h1>Add Character Container</h1>
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
