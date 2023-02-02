import React, { useEffect, useState } from "react";
import { Filter } from "../../components/Filter";
import styles from '../../styles/Pets.module.scss';
import Card from "../../components/Card";
import filterData from "../../utils/filter";
import IPet from '../../types/pet';
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

function Pets({ pets }: { pets: IPet[] }) {
    const [filters, setFilters] = useState(filterData);
    const [species, setSpecies] = useState<string[]>([]);
    const [gender, setGender] = useState<string[]>([]);
    const [age, setAge] = useState<string[]>([]);
    const [size, setSize] = useState<string[]>([]);

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
                        console.log(checkbox.name);
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
    }, [filters])

    return (
        <div className={styles['pets']}>
            <Filter filters={filters} setFilters={setFilters} />
            <div className={styles['pets__container']}>
                <h2>{filteredPets.length} results in pets!</h2>
                <div className={styles['pets__wrapper']}>
                    {filteredPets.map(pet => (
                        <Card key={pet.id} {...pet} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
    const prisma = new PrismaClient();
    const pets = await prisma.pets.findMany();
    return { props: { pets } }
}

export default Pets;