import { useEffect, useState } from 'react';
import styles from '../../styles/Pet.module.scss';
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import IPet from '../../types/pet';
import Link from 'next/link';
import { saveToLocalStorage, removeFromLocalStorage } from '../../utils/localStorage';
import { useUser } from '@auth0/nextjs-auth0/client';

function Pet(pet: IPet) {
    const { user, error, isLoading } = useUser();
    const [isExist, setIsExist] = useState<boolean>(false);

    useEffect(() => {
        setIsExist(JSON.parse(localStorage.getItem('favorites') as string)?.includes(pet.id))
    }, [pet.id])

    return (
        <section className={styles['pet']}>
            <div className={styles['pet__header']}>
                <Image src={pet.images[0]} width={600} height={600} alt='pet image' className={styles['pet__image']} />
            </div>
            {user && user.email === pet.authorId &&
                <div className={styles['pet__buttons']}>
                    {!isExist ? <button onClick={() => saveToLocalStorage('favorites', pet.id, setIsExist)} className={styles['pet__button']}>Bookmark</button> : <button onClick={() => removeFromLocalStorage('favorites', pet.id, setIsExist)} className={styles['pet__button']}>Unbookmark</button>}
                    <Link href={`/edit/${pet.id}`} className={styles['pet__button']}>Edit</Link>
                    <button className={styles['pet__button']}>Remove</button>
                </div>
            }
            <div className={styles['pet__body']}>
                <h2 className={styles["pet__heading"]}>Adoptable pets.</h2>
                <p>I&apos;m looking for my new home.</p>
                <p>Could you be my new partner?</p>
                <div className={styles["pet__details"]}>
                    <div className={styles["pet__card"]}>
                        <Image src='/pet.svg' width={32} height={32} alt='' />
                        <div className={styles["pet__description"]}>
                            <p className={styles["pet__title"]}>Name</p>
                            <p className={styles["pet__text"]}>{pet.name}</p>
                        </div>
                    </div>
                    <div className={styles["pet__card"]}>
                        <Image src='/pet.svg' width={32} height={32} alt='' />
                        <div className={styles["pet__description"]}>
                            <p className={styles["pet__title"]}>Species</p>
                            <p className={styles["pet__text"]}>{pet.species}</p>
                        </div>
                    </div>
                    <div className={styles["pet__card"]}>
                        <Image src='/pet.svg' width={32} height={32} alt='' />
                        <div className={styles["pet__description"]}>
                            <p className={styles["pet__title"]}>Breed</p>
                            <p className={styles["pet__text"]}>{pet.breed}</p>
                        </div>
                    </div>
                    <div className={styles["pet__card"]}>
                        <Image src='/pet.svg' width={32} height={32} alt='' />
                        <div className={styles["pet__description"]}>
                            <p className={styles["pet__title"]}>Gender</p>
                            <p className={styles["pet__text"]}>{pet.gender}</p>
                        </div>
                    </div>
                    <div className={styles["pet__card"]}>
                        <Image src='/pet.svg' width={32} height={32} alt='' />
                        <div className={styles["pet__description"]}>
                            <p className={styles["pet__title"]}>Age</p>
                            <p className={styles["pet__text"]}>{pet.age}</p>
                        </div>
                    </div>
                    <div className={styles["pet__card"]}>
                        <Image src='/pet.svg' width={32} height={32} alt='' />
                        <div className={styles["pet__description"]}>
                            <p className={styles["pet__title"]}>Size</p>
                            <p className={styles["pet__text"]}>{pet.size}</p>
                        </div>
                    </div>
                    <div className={styles["pet__card"]}>
                        <Image src='/pet.svg' width={32} height={32} alt='' />
                        <div className={styles["pet__description"]}>
                            <p className={styles["pet__title"]}>Location</p>
                            <p className={styles["pet__text"]}>{pet.location}</p>
                        </div>
                    </div>
                    <div className={styles["pet__card"]}>
                        <Image src='/pet.svg' width={32} height={32} alt='' />
                        <div className={styles["pet__description"]}>
                            <p className={styles["pet__title"]}>E-mail</p>
                            <p className={styles["pet__text"]}>{pet.authorId}</p>
                        </div>
                    </div>
                    <div className={styles["pet__card"]}>
                        <Image src='/pet.svg' width={32} height={32} alt='' />
                        <div className={styles["pet__description"]}>
                            <p className={styles["pet__title"]}>ID</p>
                            <p className={styles["pet__text"]}>{pet.id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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