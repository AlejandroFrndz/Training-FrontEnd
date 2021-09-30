interface Props {
    name: string,
    src: string
}

const CharacterPreview : React.FC<Props> = (props) => {
    const { name, src } = props;

    return(
        <div className="charPreview">
            <h1>{name}</h1>
            <img src={src} alt={`${name}'s face`} />
        </div>
    )
}

export default CharacterPreview;