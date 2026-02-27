import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const favorites = await prisma.userFavorite.findMany({
            where: { userId: Number(userId) },
            select: { mountainId: true },
        });

        const mountainIds = favorites.map(f => f.mountainId);

        const mountains = await prisma.mountain.findMany({
            where: { id: { in: mountainIds } },
        })

        const routeKeys = mountains.map(m => m.routeKey);

        return res.status(200).json({ success: true, routeKeys });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}