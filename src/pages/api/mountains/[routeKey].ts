import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    try {
        const { routeKey } = req.query;
        if (!routeKey || typeof routeKey !== "string") {
            return res.status(400).json({ error: "routeKey is required" });
        }

        const mountain = await prisma.mountain.findUnique({
            where: { routeKey },
        });

        if (!mountain) {
            return res.status(404).json({ error: "Mountain not found" });
        }

        return res.status(200).json({ id: mountain.id });
        
    } catch (error: any) {
        console.error("Error fetching mountain:", error);
        return res
            .status(500)
            .json({ error: error?.message || "Internal Server Error" });
    }
}
