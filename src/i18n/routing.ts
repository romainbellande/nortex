import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export enum Locale {
  En = 'en',
  Fr = 'fr'
}

export const defaultLocale = Locale.En;
export const locales = Object.values(Locale);

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
