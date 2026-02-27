import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { userId, mountainId } = req.query;

        if (!userId || !mountainId) {
            return res.status(400).json({ error: "User ID and Mountain ID are required" });
        }

        const favorite = await prisma.userFavorite.findUnique({
            where: {
                userId_mountainId: {
                    userId: Number(userId),
                    mountainId: Number(mountainId),
                },
            },
        });

        return res.status(200).json({ success: true, isFavorite: !!favorite });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}