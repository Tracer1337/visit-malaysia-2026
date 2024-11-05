import { fetchHalalTravelAPI } from '../client';
import { LocationQuery } from './types';

export function fetchLocationBlog(query: LocationQuery) {
  try {
    return fetchHalalTravelAPI<LocationBlogResponse>(
      '/ht/api/blog/srp',
      {
        pageNumber: 1,
        pageSize: 5,
      },
      {
        method: 'POST',
        body: JSON.stringify(query),
      },
    );
  } catch (error) {
    console.error(error);
    throw new Error('Could not fetch location blog from halal-travel api');
  }
}

export interface LocationBlogResponse {
  content: LocationBlogContent[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
}

export interface LocationBlogContent {
  id: number;
  coverImage: string;
  createdDate: string;
  description: string;
  title: string;
  destination: LocationBlogDestination[];
  savedCount: number;
  userId: number;
  publishDate: string;
  type: string;
  username: string;
  attractions: string[];
  interests: string[];
  bookmarked: boolean;
}

export interface LocationBlogDestination {
  location: string;
  state: string;
  country: string;
}
