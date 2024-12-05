'use client';

import {
  PropsWithChildren,
  createContext,
  createElement,
  useContext,
  useEffect,
} from 'react';
import {
  UseLocalStorageOptions,
  useLocalStorage,
} from '../hooks/useLocalStorage';
import { useRouter } from '../i18n/routing';
import { User, useAuthUser } from './user';

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

const localStoragePassthroughOptions: UseLocalStorageOptions<string | null> = {
  serializer: (value) => value ?? '',
  deserializer: (value) => value,
};

export function AuthPlaceholderProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const [token, setToken, removeToken] = useLocalStorage<string | null>(
    'token',
    null,
    localStoragePassthroughOptions,
  );
  const [, setTokenType, removeTokenType] = useLocalStorage<string | null>(
    'tokenType',
    null,
    localStoragePassthroughOptions,
  );
  const [, setUserId, removeUserId] = useLocalStorage<number | null>(
    'userId',
    null,
  );

  const user = useAuthUser(token);

  useEffect(() => {
    router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    } else {
      removeUserId();
    }
  }, [user, setUserId, removeUserId]);

  const login = () => {
    // The token should be fetched from an api
    const token =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtZXJsaW4ubW9lbHRlckBnbWFpbC5jb20iLCJ1c2VySWQiOjUxNiwiaWF0IjoxNzMzMzM0NjU1fQ.LjcAnRuPZjFxPCp8N3DH5emGnOHOHCfgUYubiyJRDXTji6CoONmn7gft62308BTQzsUVm1SL0D2cH8GlTTI6NQ';
    setToken(token);
    setTokenType('Bearer');
  };

  const logout = () => {
    removeToken();
    removeTokenType();
  };

  return createElement(
    AuthPlaceholderContext.Provider,
    { value: { user, login, logout } },
    children,
  );
}
