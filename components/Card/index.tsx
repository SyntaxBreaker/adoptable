import styles from '../../styles/Card.module.scss';
import IPet from '../../types/pet';

export default function Card(pet: IPet) {
    return (
        <div className={styles['pet-card']} style={{ backgroundImage: `url(${pet.images[0]})` }}>
            <button className={styles['pet-card__button']}>💙</button>
            <div className={styles['pet-card__body']}>
                <p className={styles['pet-card__name']}>{pet.name}</p>
                <p className={styles['pet-card__gender']}>{pet.gender}</p>
            </div>
        </div>
    )
}