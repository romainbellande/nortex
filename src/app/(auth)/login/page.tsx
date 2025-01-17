import { signIn } from '@/auth';

export default function Login() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('authentik', { redirectTo: '/' });
      }}
    >
      <button type='submit'>Signin with Authentik</button>
    </form>
  );
}
