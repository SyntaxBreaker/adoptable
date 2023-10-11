import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const pet = JSON.parse(req.body);
        const { id } = pet;
        await prisma.pets.delete({
            where: {
                id: id
            }
        })
        res.status(200).json('The offer was removed.');
    } catch (err) {
        res.status(500).json(`An error occurred.`);
    }
}