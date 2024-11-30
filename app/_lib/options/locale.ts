import { appConfig } from '@/../config';
import { SelectOption } from '@/_components/Select/Select';

export const localeOptions: SelectOption[] = appConfig.i18n.locales.map(
  (locale) => ({
    label: appConfig.i18n.labels[locale],
    value: locale,
  }),
);
