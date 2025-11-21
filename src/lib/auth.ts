
import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
  authorize: async (credentials): Promise<User | null> => {
        if (!credentials?.email || !credentials.password) return null;


        if (
          credentials.email === "admin@example.com" &&
          credentials.password === "admin123"
        ) {
          return {
            id: "1",
            name: "Pranay Admin",
            email: "admin@example.com",
            role: "admin",
          };
        }

  
        if (
          credentials.email === "customer@example.com" &&
          credentials.password === "cust123"
        ) {
          return {
            id: "2",
            name: "Pranay Customer",
            email: "customer@example.com",
            role: "customer",
          };
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
   
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role; 
      }
      return token;
    },


    session: async ({ session, token }) => {
      if (token) {
        session.user = session.user || {};
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string; 
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
