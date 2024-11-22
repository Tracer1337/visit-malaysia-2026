// eslint-disable-next-line no-restricted-imports
import { redirect } from 'next/navigation';
import { appConfig } from '../config';

export default async function RootPage() {
  redirect(`/${appConfig.i18n.defaultLocale}`);
}
