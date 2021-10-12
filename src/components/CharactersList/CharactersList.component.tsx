import React from 'react';
import { Link } from 'react-router-dom';
import { Character } from '../../redux/types';
import CharacterPreview from '../CharacterPreview/CharacterPreview.component';
import styles from './style.module.css';

interface Props {
  characters: Character[];
  onGoBack: () => void;
}

const CharactersList: React.FC<Props> = (props) => {
  const { characters } = props;

  return (
    <div className="container">
      <div className="row justify-content-center" data-testid="innerDiv">
        {characters.length > 0
          ? characters.map((character) => {
              return (
                <div
                  key={character.id}
                  className={`col-4 me-2 mb-2 pb-3 ${styles.charWrapper} ${styles.overrideWidth}`}
                >
                  <Link
                    to={`/characters/${character.id}`}
                    className={`text-decoration-none text-reset`}
                  >
                    <CharacterPreview
                      name={character.name}
                      src={character.image}
                      status={character.status}
                    />
                  </Link>
                </div>
              );
            })
          : 'No characters in record'}
      </div>
    </div>
  );
};

export default CharactersList;
