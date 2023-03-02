import React, { useState, useEffect } from "react";
import styles from '../../styles/Filter.module.scss';
import Filters from "../../types/filters";

export function Filter({ filters, setFilters }: { filters: Filters, setFilters: React.Dispatch<React.SetStateAction<Filters>> }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, checked } = event.target;

        const newFilters = filters.map(filter => ({
            ...filter,
            checkboxes: filter.checkboxes.map(checkbox => {
                if (checkbox.name === name) {
                    return { ...checkbox, checked: !checkbox.checked }
                }
                return checkbox;
            })
        }));

        setFilters(newFilters);
    }

    return (
        <section className={styles['filter']}>
            <button className={`${styles['filter__button']}`} onClick={() => setIsOpen(!isOpen)}>Filter</button>
            <form className={`${styles['filter__container']} ${isOpen && styles['filter__container--visible']}`}>
                {filters.map(filter => (
                    <React.Fragment key={filter.title}>
                        <h2 className={styles['filter__heading']}>{filter.title}</h2>
                        <div className={styles['filter__item']}>
                            {filter.checkboxes.map(checkbox => (
                                <label key={checkbox.name} className={styles['filter__label']}>
                                    <input
                                        className={styles['filter__input']}
                                        type="checkbox"
                                        name={checkbox.name}
                                        checked={checkbox.checked}
                                        onChange={handleCheckboxChange}
                                    />
                                    {checkbox.label}
                                </label>
                            ))}
                        </div>
                    </React.Fragment>
                ))}
            </form>
        </section>
    )
}