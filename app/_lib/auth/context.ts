'use client';

import {
  PropsWithChildren,
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from '../i18n/routing';

type User = {
  firstname: string;
  lastname: string;
  email: string;
};

type AuthPlaceholderContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

const AuthPlaceholderContext = createContext<AuthPlaceholderContextType | null>(
  null,
);

export function useAuthPlaceholder() {
  const context = useContext(AuthPlaceholderContext);

  if (!context) {
    throw new Error('Auth context is not available');
  }

  return context;
}

export function AuthPlaceholderProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return createElement(
    AuthPlaceholderContext.Provider,
    {
      value: {
        user,
        login: () =>
          setUser({
            firstname: 'Rioneer',
            lastname: 'Nizel',
            email: 'rioneernizel@gmail.com',
          }),
        logout: () => setUser(null),
      },
    },
    children,
  );
}
