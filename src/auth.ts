import NextAuth from "next-auth"
import Authentik from "next-auth/providers/authentik";

console.log('process.env.AUTH_AUTHENTIK_ISSUER', process.env.AUTH_AUTHENTIK_ISSUER)

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Authentik],
})
