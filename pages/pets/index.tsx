import IPet from '../../types/pet';
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import Head from 'next/head';
import PetList from "../../components/PetList";

function Pets({ pets }: { pets: IPet[] }) {
    return (
        <>
            <Head>
                <title>All pets - Adoptable</title>
            </Head>
            <PetList pets={pets} />
        </>
    )
}

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
    const prisma = new PrismaClient();
    const pets = await prisma.pets.findMany();
    return { props: { pets } }
}

export default Pets;