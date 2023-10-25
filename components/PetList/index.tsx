import React, { useEffect, useState } from "react";
import { Filter } from "../Filter";
import styles from '../../styles/Pets.module.scss';
import filterData from '../../utils/filter';
import IPet from '../../types/pet';
import Link from "next/link";
import Card from "../Card";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { usePathname } from 'next/navigation';

function PetList({ pets }: { pets: IPet[] }) {
    const [filters, setFilters] = useState(filterData);
    const [species, setSpecies] = useState<string[]>([]);
    const [gender, setGender] = useState<string[]>([]);
    const [age, setAge] = useState<string[]>([]);
    const [size, setSize] = useState<string[]>([]);

    const { user, error, isLoading } = useUser();
    const pathname = usePathname();

    const filteredPets = species?.length || gender?.length || age?.length || size?.length
        ? pets.filter(pet => {
            return (
                (!species.length || species.includes(pet.species)) &&
                (!gender.length || gender.includes(pet.gender)) &&
                (!age.length || age.includes(pet.age)) &&
                (!size.length || size.includes(pet.size))
            )
        }) : pets;

    useEffect(() => {
        filters.forEach(filter => {
            if (filter.title === 'Species') {
                filter.checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        setSpecies(prev => [...prev, checkbox.name])
                    }
                    else {
                        setSpecies(prev => prev.filter(item => item !== checkbox.name))
                    }
                })
            } else if (filter.title === 'Gender') {
                filter.checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        setGender(prev => [...prev, checkbox.name])
                    } else {
                        setGender(prev => prev.filter(item => item !== checkbox.name))
                    }
                })
            } else if (filter.title === 'Age') {
                filter.checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        setAge(prev => [...prev, checkbox.name])
                    } else {
                        setAge(prev => prev.filter(item => item !== checkbox.name))
                    }
                })
            } else if (filter.title === 'Size') {
                filter.checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        setSize(prev => [...prev, checkbox.name])
                    } else {
                        setSize(prev => prev.filter(item => item !== checkbox.name))
                    }
                })
            }
        })
    }, [filters]);

    return (
        <div className={styles['pets']}>
            <Filter filters={filters} setFilters={setFilters} />
            <div className={styles['pets__container']}>
                <h2>{filteredPets.length} results in pets!</h2>
                {filteredPets.length > 0 ? <div className={styles['pets__wrapper']}>
                    {filteredPets && filteredPets.map(pet => (
                        <Link href={`/pet/${pet.id}`} key={pet.id} className={styles['pets__link']}>
                            <Card {...pet} />
                        </Link>
                    ))}
                </div> : <div className={styles['pets__empty']}>
                    <Image src="./empty.svg" alt="" width={300} height={300} />
                    <h3 className={styles['pets__heading']}>It&apos;s empty here!</h3>
                    <p className={styles['pets__text']}>{pathname === '/pets' ? 'No pets are available.' : 'No favorite pets are available.'}</p>
                    {user && (
                        <>
                            <p className={styles['pets__suggestion']}>Why not add some?</p>
                            <Link href={`${pathname === '/pets' ? '/add' : '/pets'}`} className={styles['pets__button']}>{pathname === '/pets' ? 'Add pet' : 'See all pets'}</Link>
                        </>
                    )}
                </div>}
            </div>
        </div>
    )
}

export default PetList;