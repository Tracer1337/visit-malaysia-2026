import qs from 'qs';

export function getHalalTravelURL(path = '') {
  return `${process.env.NEXT_PUBLIC_HALAL_TRAVEL_API_URL}${path}`;
}

export async function fetchHalalTravelAPI<T>(
  path: string,
  urlParams = {},
  options: RequestInit = {},
) {
  const query = qs.stringify(urlParams);
  const url = getHalalTravelURL(`/api${path}?${query}`);

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
