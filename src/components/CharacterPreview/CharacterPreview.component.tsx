import styles from "./styles.module.css";

interface Props {
    name: string,
    src: string,
    status: string
}

const CharacterPreview : React.FC<Props> = (props) => {
    const { name, src, status } = props;

    return(
        <div className={`charPreview container`}>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">{name}</h2>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12">
                    <img className={styles.flexImg} src={src} alt={`${name}'s face`} />
                </div>
            </div>
            <div className={`row ${styles.mt}`}>
                <div className="col">
                    <p>Status:</p>
                </div>
                <div className="col" >
                    <button id={status === "Alive" ? styles.aliveLight : styles.deadLight} type="button" />
                </div>
                <div className="col" >
                    <p>{status}</p>
                </div>
            </div>
        </div>
    )
}

export default CharacterPreview;