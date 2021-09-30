import CharacterData from "../types/character.type";
import CharacterDetail from "../components/CharacterDetail/CharacterDetail.component";
import { useParams,useHistory } from 'react-router-dom';
import CharactersList from "../components/CharactersList/CharactersList.component";
import Loader from 'react-loader-spinner';

interface Props {
    characters: CharacterData[],
    loading: boolean
}

interface Params {
    id: string;
}

const CharactersContainer: React.FC<Props> = (props) => {
    const { characters, loading } = props;
    const { id } = useParams<Params>();
    const history = useHistory();

    if(id && characters.length === 0){
        history.push("/characters");
    }

    if(loading){
        return <Loader type="TailSpin"/>
    }
    
    if(id){
        const character = characters[Number(id) - 1];
        return <CharacterDetail character={character} />
    }
    else{
        return <CharactersList characters={characters} />;
    }
}

export default CharactersContainer;