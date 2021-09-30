import { Link } from 'react-router-dom';
import CharacterData from "../../types/character.type";

interface Props {
    characters: CharacterData[];
}

const CharactersList: React.FC<Props> = (props) => {
    const { characters } = props;

    return(
        <>
            {characters.length > 0 ? characters.map((character) => <Link to={`/characters/${character.id}`} key={character.id}><h1>{character.name}</h1></Link>) : "No characters recorded"}
        </>
    )
}

export default CharactersList;