import qs from 'qs';
import { appConfig } from '@/../config';

export function getHalalTravelURL(path = '') {
  return `${appConfig.api.halalTravel.url}${path}`;
}

export async function fetchHalalTravelAPI<T>(
  path: string,
  urlParams = {},
  options: RequestInit = {},
) {
  const query = qs.stringify(urlParams);
  const url = getHalalTravelURL(`${path}?${query}`);

  console.log('FETCH');
  console.log(url);

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      'Content-Type': 'application/json',
    },
  });
  const data: T = await res.json();

  console.log(data);

  return data;
}
