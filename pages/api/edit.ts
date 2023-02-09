import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const pet = JSON.parse(req.body);
        const { id, data } = pet;
        await prisma.pets.update({
            where: {
                id: id
            },
            data: data
        })
        res.status(200).json('The pet edited.');
    } catch (err) {
        res.status(500).json(`An error occurred.`);
    }
}