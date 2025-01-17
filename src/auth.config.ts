import Authentik from 'next-auth/providers/authentik';
import type { NextAuthConfig } from 'next-auth';

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Authentik]
} satisfies NextAuthConfig;
