import { PrismaClient } from "@prisma/client";
import { NextPageContext } from "next";
import Head from "next/head";
import PetList from "../../components/PetList";
import IPet from "../../types/pet";

function Pets({ pets }: { pets: IPet[] }) {
    return (
        <>
            <Head>
                <title>All pets</title>
            </Head>
            <PetList pets={pets} />
        </>
    )
}

export const getServerSideProps = async (context: NextPageContext) => {
    const { id } = context.query;
    const prisma = new PrismaClient();
    const pets = await prisma.pets.findMany({
        where: {
            location: id as string
        }
    });
    return { props: { pets } }
}

export default Pets;