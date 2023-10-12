import { KeyboardEvent, useEffect, useState } from 'react';
import styles from '../../styles/Pet.module.scss';
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import IPet from '../../types/pet';
import Link from 'next/link';
import { saveToLocalStorage, removeFromLocalStorage } from '../../utils/localStorage';
import { useUser } from '@auth0/nextjs-auth0/client';
import Router from 'next/router';
import PetDetailCard from '../../components/PetDetailCard';
import Head from "next/head";

function Pet(pet: IPet) {
    const { user, error, isLoading } = useUser();
    const [isExist, setIsExist] = useState<boolean>(false);
    const [imageIndex, setImageIndex] = useState<number>(0);

    const details = [
        { name: 'Name', value: pet.name },
        { name: 'Species', value: pet.species },
        { name: 'Breed', value: pet.breed },
        { name: 'Gender', value: pet.gender },
        { name: 'Age', value: pet.age },
        { name: 'Size', value: pet.size },
        { name: 'Location', value: pet.location },
        { name: 'E-mail', value: pet.authorId },
        { name: 'ID', value: pet.id }
    ];

    const handleRemoveOffer = async (event: React.SyntheticEvent) => {
        try {
            await fetch('/api/delete', {
                method: 'DELETE',
                body: JSON.stringify({ id: pet.id })
            }).then(() => Router.push('/pets'))
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const setPrevImage = () => setImageIndex(imageIndex => imageIndex === 0 ? pet.images.length - 1 : imageIndex - 1);
        const setNextImage = () => setImageIndex(imageIndex => imageIndex === pet.images.length - 1 ? 0 : imageIndex + 1);

        const handleImageChange = (e: Event) => {
            const keyboardEvent = e as unknown as KeyboardEvent;
            if (keyboardEvent.key === "ArrowLeft") {
                setPrevImage();
            } else if (keyboardEvent.key === "ArrowRight") {
                setNextImage();
            }
        }

        window.addEventListener("keydown", handleImageChange);

        return () => {
            window.removeEventListener("keydown", handleImageChange);
        }
    }, [])

    useEffect(() => {
        setIsExist(JSON.parse(localStorage.getItem('favorites') as string)?.includes(pet.id))
    }, [pet.id]);

    return (
        <>
            <Head>
                <title>{`${pet.species} for adoption - ${pet.name}`}</title>
            </Head>
            <section className={styles['pet']}>
                <div className={styles['pet__header']}>
                    <Image src={`${pet.images.length > 0 ? pet.images[imageIndex] : '/default.png'}`} width={1920} height={1080} alt='pet image' className={styles['pet__image']} />
                    {pet.images.length > 0 && <>
                        <button
                            className={`${styles['pet__arrow']} ${styles['pet__arrow--left']}`}
                            onClick={() => setImageIndex(imageIndex === 0 ? pet.images.length - 1 : imageIndex - 1)}>
                            &#10094;
                        </button>
                        <button
                            className={`${styles['pet__arrow']} ${styles['pet__arrow--right']}`}
                            onClick={() => setImageIndex(imageIndex === pet.images.length - 1 ? 0 : imageIndex + 1)}>
                            &#10095;
                        </button>
                    </>}
                    <div className={styles['pet__container']}>
                        {pet.images.map((image, idx) =>
                            <span
                                key={idx}
                                className={`${styles['pet__point']} ${idx === imageIndex && styles['pet__point--active']}`}
                                onClick={() => setImageIndex(idx)}>
                            </span>
                        )}
                    </div>
                </div>
                <div className={styles['pet__body']}>
                    {user && user.email === pet.authorId &&
                        <div className={styles['pet__buttons']}>
                            {!isExist ? <button onClick={() => saveToLocalStorage('favorites', pet.id, setIsExist)} className={styles['pet__button']}>Bookmark</button> : <button onClick={() => removeFromLocalStorage('favorites', pet.id, setIsExist)} className={styles['pet__button']}>Unbookmark</button>}
                            <Link href={`/edit/${pet.id}`} className={`${styles['pet__button']} ${styles['pet__button--secondary']}`}>Edit</Link>
                            <button className={`${styles['pet__button']} ${styles['pet__button--danger']}`} onClick={handleRemoveOffer}>Remove</button>
                        </div>
                    }
                    <h2 className={styles["pet__heading"]}>Adoptable pets.</h2>
                    <p>I&apos;m looking for my new home.</p>
                    <p>Could you be my new partner?</p>
                    <div className={styles["pet__details"]}>
                        {details.map(detail => (
                            <PetDetailCard {...detail} key={detail.name} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const index = context.params?.index;
    try {
        const prisma = new PrismaClient();
        const pet = await prisma.pets.findFirst({
            where: {
                id: `${index}`
            }
        });

        return {
            props: {
                ...pet
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export default Pet;