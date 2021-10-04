import React from 'react';
import CharacterData from '../../types/character.type';
import {
  AiOutlineExclamationCircle,
  AiOutlineCheckCircle
} from 'react-icons/ai';

interface Props {
  character: CharacterData;
  onGoBack: () => void;
  onKill: (character: CharacterData) => Promise<void>;
  loadingKill: boolean;
}

const CharacterDetail: React.FC<Props> = (props) => {
  const { character, onGoBack, onKill, loadingKill } = props;

  const handleKill = () => {
    onKill(character);
  };

  let useless = 4;

  return (
    <div className="character">
      <h1>{character.name}</h1>
      <h2>{character.species}</h2>
      <h3>{character.gender}</h3>
      {character.status === 'Alive' ? (
        <AiOutlineCheckCircle />
      ) : (
        <AiOutlineExclamationCircle />
      )}
      <p>{character.status}</p>
      <button type="button" disabled={loadingKill} onClick={handleKill}>
        {character.status === 'Alive' ? <>Kill</> : <>Revive</>}
      </button>
      <img src={character.image} alt={character.name + 'face'} />
      <button onClick={onGoBack}>Go Back</button>
    </div>
  );
};

export default CharacterDetail;
