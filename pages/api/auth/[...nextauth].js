import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/database/connectDB";
import User from "@/models/user";
import bcrypt from "bcrypt";

async function refreshAccessToken(token) {
  try {
    const {_id} = token
    const user = await User.findById(_id)

    if (!user) {
      // throw refreshedTokens
      return null
    }

    return {
      ...token,
      name: user.name,
      // accessToken: refreshedTokens.access_token,
      // accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      // refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try{
          await connectDB();
          const user = await User.findOne({ email });

          if (!user) throw new Error("user not found");

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) throw new Error("password wrong");

          const doc = user._doc;
          delete doc.password;
          return doc
        }
        catch(err){
          console.log(error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session(session) {
      // console.log("by session in nextauth", session);
      return session;
    },
    async jwt({ token, user }) {
      if(user) {
        token._id = user._id
        token.role = user.role
        return token
      }
      
      return refreshAccessToken(token);
    },
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  session: {
    maxAge: 24 * 60 * 60,
  },
};

export default NextAuth(authOptions);
