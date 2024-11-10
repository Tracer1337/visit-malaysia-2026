import { useRouter } from 'next/navigation';

export function useChangeLanguage() {
  const router = useRouter();

  const changeLanguage = (locale: string) => {
    const path = location.pathname.split('/').slice(2);
    router.replace(`/${locale}/${path.join('/')}${location.search}`);
  };

  return changeLanguage;
}
