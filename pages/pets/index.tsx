import React from "react";
import { Filter } from "../../components/Filter";
import styles from '../../styles/Pets.module.scss';
import pets from '../../utils/mock';

function Pets() {
    return (
        <div className={styles['pets']}>
            <Filter />
            <div className={styles['pets__container']}>
                <h2>60 results in pets</h2>
                <div className={styles['pets__wrapper']}>
                    {pets.map(pet => (
                        <div key={pet.id} className={styles['pet-card']} style={{backgroundImage: `url(https://cdn.pixabay.com/photo/2013/07/07/04/58/weimaraner-143753_960_720.jpg)`}}>
                            <button className={styles['pet-card__button']}>💙</button>
                            <div className={styles['pet-card__body']}>
                                <p className={styles['pet-card__name']}>{pet.name}</p>
                                <p className={styles['pet-card__gender']}>{pet.gender}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Pets;