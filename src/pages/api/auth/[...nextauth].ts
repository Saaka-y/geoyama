// https://next-auth.js.org/getting-started/example

import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma"; 
import bcrypt from "bcryptjs";


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

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
    }
}

export const authOptions: NextAuthOptions = {
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
                    return null;
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
        async jwt({ token, user }) { // 引数userにはauthorize関数で返されたユーザーオブジェクトが入る
            if(user) {
                token.id = user.id; // JWTのidにユーザーIDを設定
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
            }
            return session; // ここのsessionに含まれるuserオブジェクトは、クライアント側でuseSession()を使ってアクセスできるようになる
        }
    },
};
    
export default NextAuth(authOptions);
