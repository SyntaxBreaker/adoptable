import React, { useState, useEffect } from "react";
import filterData from "../../utils/filter";
import styles from '../../styles/Filter.module.scss';

export function Filter() {
    const [filters, setFilters] = useState(filterData);
    const [isOpen, setIsOpen] = useState(false);

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, checked} = event.target;

        const newFilters = filters.map(filter => ({
            ...filter,
            checkboxes: filter.checkboxes.map(checkbox => {
                if(checkbox.name === name) {
                    return {...checkbox, checked: !checkbox.checked}
                }
                return checkbox;
            })
        }));

        setFilters(newFilters);
    }

    return (
        <section className={styles['form']}>
            <button className={`${styles['form__button']}`} onClick={() => setIsOpen(!isOpen)}>Filter</button>
            <form className={`${styles['form__container']} ${isOpen && styles['form__container--visible']}`}>
            {filters.map(filter => (
                <React.Fragment key={filter.title}>
                    <h2 className={styles['form__title']}>{filter.title}</h2>
                    <div className={styles['form__item']}>
                        {filter.checkboxes.map(checkbox => (
                            <label key={checkbox.name} className={styles['form__label']}>
                                <input
                                    className={styles['form__input']}
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