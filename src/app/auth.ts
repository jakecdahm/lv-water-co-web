import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface AuthUser {
  email: string;
  password: string;
}

const users: AuthUser[] = JSON.parse(process.env.AUTH_USERS ?? "[]");

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        return user ? { id: user.email, email: user.email } : null;
      },
    }),
  ],
  pages: { signIn: "/auth/signin" },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
});
