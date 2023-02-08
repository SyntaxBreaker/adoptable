import React, { useState } from 'react';
import styles from '../../styles/Form.module.scss';
import { useUser } from '@auth0/nextjs-auth0/client';
import IFormData from '../../types/form';
import axios from 'axios';
import Router from 'next/router';

function Form({ method }: { method: string }) {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        location: '',
        species: '',
        breed: '',
        gender: '',
        age: '',
        size: ''
    });
    const [images, setImages] = useState<string[]>([]);

    const { user, error, isLoading } = useUser();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;

        if (name === "images") {
            const files = event.target.files;

            if (files) {
                for (let i = 0; i < files.length; i++) {
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        setImages(prev => [...prev, reader.result as string]);
                    };
                    reader.readAsDataURL(files[i]);
                }
            }

            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        try {
            const imageURLs: string[] = [];

            for (let i = 0; i < images.length; i++) {
                const image = images[i].split(",")[1];
                const formData = new FormData();
                formData.set("key", `${process.env.IMGBB_API_KEY}`);
                formData.append("image", image);

                const res = await axios({
                    method: "POST",
                    url: "https://api.imgbb.com/1/upload",
                    data: formData,
                });

                imageURLs.push(res.data.data.url);
            }

            if (method === 'POST') {
                const data = {
                    ...formData,
                    authorId: user?.email,
                    images: imageURLs
                }

                await fetch('/api/create', {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                    .then(() => {
                        Router.push('/pets');
                    })
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form className={styles['form']} onSubmit={handleSubmit}>
            <label className={styles['form__label']}>
                Name:
                <input type="text" name='name' placeholder='Enter name' onChange={handleChange} className={styles['form__input']} required />
            </label>
            <label className={styles['form__label']}>
                Location:
                <input type="text" name='location' placeholder='Enter location' onChange={handleChange} className={styles['form__input']} required />
            </label>
            <label className={styles['form__label']}>
                Species:
                <div className={styles['form__group']}>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Bird" name="species" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} required /> <span className={styles['form__input--text']}>Bird</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Cat" name="species" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Cat</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Dog" name="species" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Dog</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Pig" name="species" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Pig</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Rabbit" name="species" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Rabbit</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Other" name="species" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Other</span>
                    </div>
                </div>
            </label>
            <label className={styles['form__label']}>
                Breed:
                <input type="text" name='breed' placeholder='Enter breed' onChange={handleChange} className={styles['form__input']} required />
            </label>
            <label className={styles['form__label']}>
                Gender:
                <div className={styles['form__group']}>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Female" name="gender" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} required /> <span className={styles['form__input--text']}>Female</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Male" name="gender" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Male</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Unknown" name="gender" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Unknown</span>
                    </div>
                </div>
            </label>
            <label className={styles['form__label']}>
                Age:
                <div className={styles['form__group']}>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Adult" name="age" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} required /> <span className={styles['form__input--text']}>Adult</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Baby" name="age" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Baby</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Senior" name="age" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Senior</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Young" name="age" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Young</span>
                    </div>
                </div>
            </label>
            <label className={styles['form__label']}>
                Size:
                <div className={styles['form__group']}>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Unknown" name="size" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} required /> <span className={styles['form__input--text']}>Unknown</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Small" name="size" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Small</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Medium" name="size" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Medium</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Large" name="size" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Large</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Extra small" name="size" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Extra small</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Extra large" name="size" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Extra large</span>
                    </div>
                </div>
            </label>
            <label className={styles['form__label']}>
                images:
                <input type="file" name='images' multiple onChange={handleChange} className={styles['form__input']} required />
            </label>
            <button className={`${styles['form__input']} ${styles['form__input--button']}`}>Submit</button>
        </form>
    )
}

export default Form;