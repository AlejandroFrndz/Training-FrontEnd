import React from 'react';
import { Character } from '../../redux/types';
import {
  AiOutlineExclamationCircle,
  AiOutlineCheckCircle
} from 'react-icons/ai';

export interface Props {
  character: Character;
  onGoBack: () => void;
  onKill: (character: Character) => Promise<void>;
  loadingKill: boolean;
  onDelete: (id: number) => Promise<void>;
}

const CharacterDetail: React.FC<Props> = (props) => {
  const { character, onGoBack, onKill, loadingKill, onDelete } = props;

  const handleKill = () => {
    onKill(character);
  };

  const handleDelete = () => {
    onDelete(character.id);
  };

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
      <button type="button" onClick={handleDelete}>
        Vaporize
      </button>
      <img src={character.image} alt={character.name + 'face'} />
      <button onClick={onGoBack}>Go Back</button>
    </div>
  );
};

export default CharacterDetail;
