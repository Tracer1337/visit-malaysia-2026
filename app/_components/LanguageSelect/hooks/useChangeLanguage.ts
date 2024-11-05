import { useRouter } from 'next/navigation';
import { Locale } from '../../../../i18n-config';

export function useChangeLanguage() {
  const router = useRouter();

  const changeLanguage = (locale: Locale) => {
    const path = location.pathname.split('/').slice(2);
    router.replace(`/${locale}/${path.join('/')}${location.search}`);
  };

  return changeLanguage;
}
