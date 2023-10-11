import styles from '../../styles/Pet.module.scss';
import Image from 'next/image';

function PetDetailCard({ name, value }: { name: string, value: string | number }) {
    return (
        <div className={styles["pet__card"]}>
            <Image src='/pet.svg' width={48} height={48} alt='' />
            <div className={styles["pet__description"]}>
                <p className={styles["pet__title"]}>{name}</p>
                <p className={styles["pet__text"]}>{value}</p>
            </div>
        </div>
    )
}

export default PetDetailCard;