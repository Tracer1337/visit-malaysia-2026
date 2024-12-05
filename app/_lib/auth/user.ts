import { useEffect, useState } from 'react';

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};

export function useAuthUser(token: string | null): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      fetchUser(token).then((user) => setUser(user));
    } else {
      setUser(null);
    }
  }, [token]);

  return user;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchUser(token: string) {
  // The user should be fetched from an api
  return {
    id: 516,
    firstname: 'Rioneer',
    lastname: 'Nizel',
    email: 'rioneernizel@gmail.com',
  };
}
