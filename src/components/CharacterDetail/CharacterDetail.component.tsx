import CharacterData from "../../types/character.type";
import { AiOutlineExclamationCircle, AiOutlineCheckCircle } from 'react-icons/ai';

interface Props {
    character: CharacterData,
    onGoBack: () => void
}

const CharacterDetail : React.FC<Props> = (props) => {
    const { character, onGoBack} = props;

    return(
        <div className="character">
            <h1>{character.name}</h1>
            <h2>{character.species}</h2>
            <h3>{character.gender}</h3>
            {character.status === "Alive" ? <AiOutlineCheckCircle />  : <AiOutlineExclamationCircle />}<p>{character.status}</p>
            <img src={character.image} alt={character.name + "face"}/>
            <button onClick={onGoBack}>Go Back</button>

        </div>
    )
}

export default CharacterDetail;