import qs from 'qs';
import { appConfig } from '@/../config';

export function getStrapiURL(path = '') {
  return `${appConfig.api.strapi.url}${path}`;
}

export async function fetchStrapiAPI<T>(
  path: string,
  urlParams = {},
  options: RequestInit = {},
) {
  const query = qs.stringify(urlParams);
  const url = getStrapiURL(`/api${path}?${query}`);

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      'Content-Type': 'application/json',
    },
  });
  const data: T = await res.json();

  return data;
}
