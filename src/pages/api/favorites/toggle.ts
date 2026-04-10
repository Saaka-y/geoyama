// favorite参照API

import { NextApiResponse, NextApiRequest } from "next";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { mountainId } = req.query;
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        
        const userId = session?.user?.id;

        if (!userId || !mountainId) {
            return res
                .status(400)
                .json({ error: "User ID and Mountain ID are required" });
        }

        // Check if the favorite already exists
        const existingFavorite = await prisma.userFavorite.findUnique({
            where: {
                userId_mountainId: {
                    userId: Number(userId),
                    mountainId: Number(mountainId),
                },
            },
        });

        if (existingFavorite) {
            await prisma.userFavorite.delete({
                where: {
                    userId_mountainId: {
                        userId: Number(userId),
                        mountainId: Number(mountainId),
                    },
                },
            });
            return res.status(200).json({ favorited: false });
        } else {
            await prisma.userFavorite.create({
                data: {
                    userId: Number(userId),
                    mountainId: Number(mountainId),
                },
            });
            return res.status(200).json({ favorited: true });
        }
    } catch (error: any) {
        console.error("Favorite API error:", error);
        return res
            .status(500)
            .json({ error: error?.message || "Internal Server Error" });
    }
}
