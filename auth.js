
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import bcrypt from "bcryptjs"
// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import Google from "next-auth/providers/google"
// import mongoClientPromise from "./db/mongoClient"
// import { userModel } from "./models/user-model"

// export const { handlers: { POST, GET }, signIn, signOut, auth } = NextAuth({
//     adapter: MongoDBAdapter(mongoClientPromise),
//     session: { strategy: "jwt" },
//     providers: [
//         Credentials({
//             credentials: {
//                 email: {},
//                 password: {}
//             },
//             async authorize(credentials) {
//                 if (credentials == null) return null;

//                 try {
//                     const user = await userModel.findOne({ email: credentials.email });

//                     if (!user) {
//                         throw new Error("Invalid credentials");
//                     } else {
//                         const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

//                         if (isPasswordValid) {
//                             return user;
//                         } else {
//                             throw new Error("Invalid credentials");
//                         }
//                     }
//                 } catch (error) {
//                     throw new Error(error);
//                 }
//             }
//         }),

//         Google({
//             clientId: process.env.AUTH_GOOGLE_ID,
//             clientSecret: process.env.AUTH_GOOGLE_SECRET,
//         })
//     ],
// })

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import mongoClientPromise from "./db/mongoClient";
import { userModel } from "./models/user-model";

export const {
    handlers: { POST, GET },
    signIn,
    signOut,
    auth,
} = NextAuth({
    adapter: MongoDBAdapter(mongoClientPromise),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("MissingCredentials"); // You can handle this too if needed
                }

                const user = await userModel.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("UserNotFound"); // 🔥 Custom error
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    throw new Error("InvalidPassword"); // 🔥 Custom error
                }

                return user;
            },
        }),

        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
});
