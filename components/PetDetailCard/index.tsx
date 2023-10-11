import styles from '../../styles/Pet.module.scss';

function PetDetailCard({ name, value }: { name: string, value: string | number }) {
    return (
        <div className={styles["pet__card"]}>
            <p className={styles["pet__title"]}>{name}:</p>
            <p className={styles["pet__text"]}>{value}</p>
        </div>
    )
}

export default PetDetailCard;