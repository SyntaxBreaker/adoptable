import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const IDs = req.query['IDs[]'];
        if (IDs) {
            const favoritePets = await prisma.pets.findMany({
                where: {
                    id: { in: IDs }
                }
            });

            res.json(favoritePets);
        } else {
            res.json([]);
        }
    } catch (err) { }
}