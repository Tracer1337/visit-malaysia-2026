import { fetchHalalTravelAPI } from '../client';
import { LocationQuery } from './types';

export function fetchLocationDetails(query: LocationQuery) {
  try {
    return fetchHalalTravelAPI<LocationDetailsResponse>(
      '/gpt/location',
      {},
      {
        method: 'POST',
        body: JSON.stringify(query),
      },
    );
  } catch (error) {
    console.error(error);
    throw new Error('Could not fetch location details from halal-travel api');
  }
}

export interface LocationDetailsResponse {
  id: number;
  title: string;
  blog: string;
  summary: string;
  status: string;
  headerImage: string | null;
  pinStatus: string;
  blogLocations: LocationDetailsBlogLocation[];
  savedCount: number;
}

export interface LocationDetailsBlogLocation {
  location: string;
  state: string;
  country: string;
}
