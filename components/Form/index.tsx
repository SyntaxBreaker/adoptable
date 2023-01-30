import styles from '../../styles/Form.module.scss'

function Form() {
    return (
        <form className={styles['form']}>
            <label className={styles['form__label']}>
                Title:
                <input type="text" placeholder='Enter title' className={styles['form__input']} />
            </label>
            <label className={styles['form__label']}>
                Location:
                <input type="text" placeholder='Enter location' className={styles['form__input']} />
            </label>
            <label className={styles['form__label']}>
                Species:
                <div className={styles['form__group']}>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Bird" name="species" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Bird</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Cat" name="species" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Cat</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Dog" name="species" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Dog</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Pig" name="species" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Pig</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Rabbit" name="species" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Rabbit</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Other" name="species" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Other</span>
                    </div>
                </div>
            </label>
            <label className={styles['form__label']}>
                Breed:
                <input type="text" placeholder='Enter breed' className={styles['form__input']} />
            </label>
            <label className={styles['form__label']}>
                Gender:
                <div className={styles['form__group']}>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Female" name="gender" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Female</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Male" name="gender" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Male</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Unknown" name="gender" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Unknown</span>
                    </div>
                </div>
            </label>
            <label className={styles['form__label']}>
                Age:
                <div className={styles['form__group']}>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Adult" name="age" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Adult</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Baby" name="age" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Baby</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Senior" name="age" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Senior</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Young" name="age" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Young</span>
                    </div>
                </div>
            </label>
            <label className={styles['form__label']}>
                Size:
                <div className={styles['form__group']}>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Unknown" name="size" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Unknown</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Small" name="size" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Small</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Medium" name="size" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Medium</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Large" name="size" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Large</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Extra small" name="size" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Extra small</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Extra large" name="size" className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Extra large</span>
                    </div>
                </div>
            </label>
            <button className={`${styles['form__input']} ${styles['form__input--button']}`}>Submit</button>
        </form>
    )
}

export default Form;