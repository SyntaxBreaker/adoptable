import React from "react";
import { Filter } from "../../components/Filter";
import styles from '../../styles/Pets.module.scss';
import pets from '../../utils/mock';
import Card from "../../components/Card";

function Pets() {
    return (
        <div className={styles['pets']}>
            <Filter />
            <div className={styles['pets__container']}>
                <h2>60 results in pets</h2>
                <div className={styles['pets__wrapper']}>
                    {pets.map(pet => (
                        <Card key={pet.id} {...pet} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Pets;