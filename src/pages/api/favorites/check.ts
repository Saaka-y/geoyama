import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { mountainId } = req.query;
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const userId = session.user.id;

        if (!mountainId) {
            return res.status(400).json({ error: "Mountain ID is required" });
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