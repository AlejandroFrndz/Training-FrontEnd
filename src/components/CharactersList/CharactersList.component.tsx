import { Link } from 'react-router-dom';
import CharacterData from "../../types/character.type";
import CharacterPreview from "../CharacterPreview/CharacterPreview.component";

interface Props {
    characters: CharacterData[],
    onGoBack: () => void
}

const CharactersList: React.FC<Props> = (props) => {
    const { characters, onGoBack } = props;

    return(
        <>
            {characters.length > 0 ? characters.map((character) => <Link to={`/characters/${character.id}`} key={character.id}><CharacterPreview name={character.name} src={character.image} /></Link>) : "No characters in record"}
            <button onClick={onGoBack}>Go Back</button>
        </>
    )
}

export default CharactersList;