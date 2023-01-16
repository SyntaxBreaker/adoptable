import React, {useState} from "react";
import { Filter } from "../../components/Filter";
import styles from '../../styles/Pets.module.scss';
import pets from '../../utils/mock';
import Card from "../../components/Card";
import filterData from "../../utils/filter";

function Pets() {
    const [filters, setFilters] = useState(filterData);
    
    return (
        <div className={styles['pets']}>
            <Filter filters={filters} setFilters={setFilters} />
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