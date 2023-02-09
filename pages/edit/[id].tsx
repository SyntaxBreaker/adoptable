import Head from "next/head";
import Form from "../../components/Form";
import { GetServerSidePropsContext } from "next";
import { PrismaClient } from "@prisma/client";
import IPet from "../../types/pet";

function Edit(pet: IPet) {
    return (
        <>
            <Head>
                <title>Edit pet announcement</title>
            </Head>
            <Form method="PUT" pet={pet} />
        </>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const index = context.params?.id
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
    } catch { }
}

export default Edit;