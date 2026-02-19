import { NextApiResponse, NextApiRequest  } from "next"
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json(
        { error: "Email, password, and name are required" },
    )
  }

  // 既存ユーザーチェック
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return res.status(400).json(
      { error: "User already exists" }
    )
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      name: name ?? "User",
      passwordHash: hashedPassword,
    },
  })

  return res.status(200).json({ success: true })
}
