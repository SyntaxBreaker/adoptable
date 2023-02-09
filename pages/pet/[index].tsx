import styles from '../../styles/Pet.module.scss';
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import IPet from '../../types/pet';

function Pet(pet: IPet) {
    return (
        <section className={styles['pet']}>
            <div className={styles['pet__header']}>
                <Image src='/friends.jpg' width={600} height={600} alt='pet image' className={styles['pet__image']} />
            </div>
            <div className={styles['pet__body']}>
                <h2 className={styles["pet__headline"]}>Adoptable pets.</h2>
                <p>I&apos;m looking for my new home.</p>
                <p>Could you be my new partner?</p>
                <div className={styles['pet__buttons']}>
                    <Image src='/edit.svg' width={42} height={42} alt='Add to favorites' className={`${styles['pet__button']} ${styles['pet__button--edit']}`} />
                    <Image src='/heart.svg' width={42} height={42} alt='Add to favorites' className={`${styles['pet__button']} ${styles['pet__button--favorite']}`} />
                </div>
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
    } catch {}
}

export default Pet;