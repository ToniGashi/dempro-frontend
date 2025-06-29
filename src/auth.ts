// src/auth/[...nextauth].ts

import NextAuth, {
  NextAuthOptions,
  Session,
  User as NextAuthUser,
} from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import MicrosoftProvider from "next-auth/providers/microsoft";
// import FacebookProvider from "next-auth/providers/facebook";

import { z } from "zod";
import { redirect } from "next/navigation";

import { postFetch } from "./lib/api-helpers";
import {
  authenticateGO,
  authenticateFB,
  TUserData,
} from "./app/(authentication)/actions";

/** ────────────────
 *  MODULE AUGMENTATION
 *  ────────────────
 */
type CustomProfile = Pick<
  TUserData["profile"],
  "phone" | "dateOfBirth" | "lastName" | "nationality"
>;

declare module "next-auth" {
  interface User extends CustomProfile {
    id: string;
    accessToken: string;
    signedInWith: string;
    profilePicture: string | null;
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends CustomProfile {
    id: string;
    accessToken: string;
    signedInWith: string;
    profilePicture: string | null;
  }
}

/** ────────────────
 *  DB FETCH HELPER
 *  ────────────────
 */
async function getUserFromDb(
  email: string,
  password: string
): Promise<TUserData> {
  const result = await postFetch<TUserData>("/Auth/access-token", {
    email,
    password,
  });

  // Check if result is a FetchError (adjust this check if your FetchError type is different)
  if (
    !result ||
    "error" in result || // assuming FetchError has an 'error' property
    typeof (result as TUserData).accessToken !== "string" ||
    typeof (result as TUserData).signedInWith !== "string" ||
    typeof (result as TUserData).profile !== "object"
  ) {
    throw new Error("Invalid user data");
  }

  return result as TUserData;
}

/** ────────────────
 *  PROVIDERS & PROVIDER MAP
 *  ────────────────
 */
const providers: NonNullable<NextAuthOptions["providers"]> = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  // MicrosoftProvider({
  //   clientId: process.env.MICROSOFT_CLIENT_ID!,
  //   clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
  // }),
  // FacebookProvider({
  //   clientId: process.env.FACEBOOK_ID!,
  //   clientSecret: process.env.FACEBOOK_SECRET!,
  // }),
  CredentialsProvider({
    name: "Email / Password",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials): Promise<NextAuthUser | null> => {
      const parsed = z
        .object({
          email: z.string().email(),
          password: z.string().min(8),
        })
        .safeParse(credentials);
      if (!parsed.success) return null;

      try {
        const userData = await getUserFromDb(
          parsed.data.email,
          parsed.data.password
        );
        return {
          id: userData.profile.id.toString(),
          name: userData.profile.firstName,
          email: userData.profile.email,
          image: userData.profile.image,
          lastName: userData.profile.lastName,
          phone: userData.profile.phone,
          dateOfBirth: userData.profile.dateOfBirth,
          nationality: userData.profile.nationality,
          accessToken: userData.accessToken,
          signedInWith: userData.signedInWith,
          profilePicture: userData.profile.profilePicture,
        };
      } catch {
        return null;
      }
    },
  }),
];

export const providerMap: { id: string; name: string }[] = providers.map(
  (p) => ({ id: p.id, name: p.name })
);

/** ────────────────
 *  NEXT-AUTH CONFIG
 *  ────────────────
 */
export const authOptions: NextAuthOptions = {
  providers,

  pages: {
    signIn: "/signin",
    newUser: "/signup",
    error: "/access-denied",
  },

  callbacks: {
    /** After OAuth or credentials sign-in, enrich `user` */
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const result = await authenticateGO(
          account.id_token,
          account.access_token
        );
        if (typeof result === "string") {
          redirect("/signin");
          return false;
        }
        Object.assign(user, {
          id: result.profile.id.toString(),
          lastName: result.profile.lastName,
          phone: result.profile.phone,
          dateOfBirth: result.profile.dateOfBirth,
          nationality: result.profile.nationality,
          accessToken: result.accessToken,
          signedInWith: result.signedInWith,
          profilePicture: result.profile.profilePicture,
        });
      } else if (account?.provider === "facebook") {
        const result = await authenticateFB(account.access_token);
        if (typeof result === "string") {
          redirect("/signin");
          return false;
        }
        Object.assign(user, {
          id: result.profile.id.toString(),
          lastName: result.profile.lastName,
          phone: result.profile.phone,
          dateOfBirth: result.profile.dateOfBirth,
          nationality: result.profile.nationality,
          accessToken: result.accessToken,
          signedInWith: result.signedInWith,
          profilePicture: result.profile.profilePicture,
        });
      }
      return true;
    },

    /** Persist custom fields into the session */
    async session({
      session,
      token,
    }: {
      session: Session;
      token: NextAuthJWT;
    }) {
      if (session.user) {
        Object.assign(session.user, {
          id: token.id,
          lastName: token.lastName,
          phone: token.phone,
          dateOfBirth: token.dateOfBirth,
          nationality: token.nationality,
          accessToken: token.accessToken,
          signedInWith: token.signedInWith,
          profilePicture: token.profilePicture,
        });
      }
      return session;
    },

    /** Persist custom fields into the JWT */
    async jwt({ token, user }: { token: NextAuthJWT; user?: NextAuthUser }) {
      if (user) {
        Object.assign(token, {
          id: user.id,
          lastName: user.lastName,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth,
          nationality: user.nationality,
          accessToken: user.accessToken,
          signedInWith: user.signedInWith,
          profilePicture: user.profilePicture,
        });
      }
      return token;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
};

/** Export NextAuth handlers & client helpers */
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
