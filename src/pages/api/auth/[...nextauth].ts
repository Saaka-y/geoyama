import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma"; // 
import bcrypt from "bcryptjs";

// Extend the session user type to include 'id'
declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error(
                        "Please enter both email and password to sign in",
                    );
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                });

                if (!user) {
                    throw new Error("No user found with the given email");
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.passwordHash,
                );
                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                return {id: user.id.toString(), email: user.email, name: user.name}
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token, user }) {
            if (session?.user && token?.sub) {
                session.user.id = token.sub;
            }
            return session;
        }
    },
});
