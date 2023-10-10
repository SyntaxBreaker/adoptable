import React, { useEffect, useState } from 'react';
import styles from '../../styles/Form.module.scss';
import { useUser } from '@auth0/nextjs-auth0/client';
import IFormData from '../../types/form';
import axios from 'axios';
import Router from 'next/router';
import IPet from '../../types/pet';
import Image from 'next/image';

function Form({ method, pet }: { method: string, pet?: IPet }) {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        location: '',
        species: '',
        breed: '',
        gender: '',
        age: '',
        size: '',
        images: []
    });
    const [images, setImages] = useState<string[]>([]);
    const { user, error, isLoading } = useUser();

    useEffect(() => {
        if (pet) {
            setFormData(({
                name: pet.name,
                location: pet.location,
                species: pet.species,
                breed: pet.breed,
                gender: pet.gender,
                age: pet.age,
                size: pet.size,
                images: pet.images
            }))
        }
    }, [pet])

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

    const handleRemoveUploadedImages = (imageURL: string) => {
        const { images } = formData;

        setFormData({
            ...formData,
            images: images?.filter(image => image !== imageURL)
        });
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
            } else if (method === 'PUT') {
                const data = {
                    ...formData,
                    authorId: user?.email,
                    images: [...formData.images as [], ...imageURLs]
                }

                await fetch('/api/edit', {
                    method: 'PUT',
                    body: JSON.stringify({ data: data, id: pet?.id })
                })
                    .then(() => {
                        Router.push(`/pet/${pet?.id}`);
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
                <input type="text" name='name' value={pet?.name} placeholder='Enter name' onChange={handleChange} className={styles['form__input']} required />
            </label>
            <label className={styles['form__label']}>
                Location:
                <input type="text" name='location' value={pet?.location} placeholder='Enter location' onChange={handleChange} className={styles['form__input']} required />
            </label>
            <label className={styles['form__label']}>
                Species:
                <div className={styles['form__group']}>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Bird" checked={formData.species === 'Bird'} name="species" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} required /> <span className={styles['form__input--text']}>Bird</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Cat" checked={formData.species === 'Cat'} name="species" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Cat</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Dog" checked={formData.species === 'Dog'} name="species" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Dog</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Pig" checked={formData.species === 'Pig'} name="species" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Pig</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Rabbit" checked={formData.species === 'Rabbit'} name="species" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Rabbit</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Other" checked={formData.species === 'Other'} name="species" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Other</span>
                    </div>
                </div>
            </label>
            <label className={styles['form__label']}>
                Breed:
                <input type="text" name='breed' value={pet?.breed} placeholder='Enter breed' onChange={handleChange} className={styles['form__input']} required />
            </label>
            <label className={styles['form__label']}>
                Gender:
                <div className={styles['form__group']}>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Female" checked={formData.gender === 'Female'} name="gender" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} required /> <span className={styles['form__input--text']}>Female</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Male" checked={formData.gender === 'Male'} name="gender" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Male</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Unknown" checked={formData.gender === 'Unknown'} name="gender" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Unknown</span>
                    </div>
                </div>
            </label>
            <label className={styles['form__label']}>
                Age:
                <div className={styles['form__group']}>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Adult" checked={formData.age === 'Adult'} name="age" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} required /> <span className={styles['form__input--text']}>Adult</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Baby" checked={formData.age === 'Baby'} name="age" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Baby</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Senior" checked={formData.age === 'Senior'} name="age" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Senior</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Young" checked={formData.age === 'Young'} name="age" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Young</span>
                    </div>
                </div>
            </label>
            <label className={styles['form__label']}>
                Size:
                <div className={styles['form__group']}>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Small" checked={formData.size === 'Small'} name="size" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Small</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Medium" checked={formData.size === 'Medium'} name="size" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Medium</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Large" checked={formData.size === 'Large'} name="size" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Large</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Extra small" checked={formData.size === 'Extra small'} name="size" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Extra small</span>
                    </div>
                    <div className={styles['form__item']}>
                        <input type="radio" value="Extra large" checked={formData.size === 'Extra large'} name="size" onChange={handleChange} className={`${styles['form__input']} ${styles["form__input--radio"]}`} /> <span className={styles['form__input--text']}>Extra large</span>
                    </div>
                </div>
            </label>
            {formData.images!.length > 0 &&
                <>
                    <h2 className={`${styles['form__heading']} ${styles['form__heading--normal']}`}>Uploaded images:</h2>
                    <div className={styles['form__images']}>
                        {formData.images?.map(image => (
                            <Image src={image} width={0} height={0} sizes="100vw" alt='' className={styles['form__image']} onClick={() => handleRemoveUploadedImages(image)} key={image} />
                        ))}
                    </div>
                    <p className={`${styles['form__paragraph']}`}>Click the image to remove it.</p>
                </>
            }
            <label className={styles['form__label']}>
                Images:
                <input type="file" name='images' multiple onChange={handleChange} className={styles['form__input']} />
            </label>
            <button className={`${styles['form__input']} ${styles['form__input--button']}`}>Submit</button>
        </form>
    )
}

export default Form;