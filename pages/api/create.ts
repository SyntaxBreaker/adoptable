import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = JSON.parse(req.body);
        await prisma.pets.create({ data });
        res.status(200).json('The pet was added.');
    } catch (err) {
        res.status(500).json(`An error occurred.`);
    }
}