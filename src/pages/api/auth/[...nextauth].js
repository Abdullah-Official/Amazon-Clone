import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "292575803235-74ss3ak7mal0i71n05rp5vd2bp1q249v.apps.googleusercontent.com",
            clientSecret: process.env.GOOGLE_SECRET || "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",
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)