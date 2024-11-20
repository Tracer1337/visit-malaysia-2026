import { appConfig } from '../../../config';
import { fetchHalalTravelAPI } from './client';
import { LocationQuery } from './location/types';

export function fetchLocationBlog(query: LocationQuery) {
  try {
    return fetchHalalTravelAPI<BlogResponse>(
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

export function fetchMostBookmarkedBlog() {
  try {
    return fetchHalalTravelAPI<BlogResponse>(
      '/ht/api/blog/srp-most-bookmark',
      {
        pageNumber: 1,
        pageSize: 10,
      },
      {
        method: 'POST',
      },
    );
  } catch (error) {
    console.error(error);
    throw new Error(
      'Could not fetch most bookmarked blog from halal-travel api',
    );
  }
}

export function fetchMostRecentBlog() {
  try {
    return fetchHalalTravelAPI<BlogResponse>(
      '/ht/api/blog/srp-recent',
      {
        pageNumber: 1,
        pageSize: 10,
      },
      {
        method: 'POST',
      },
    );
  } catch (error) {
    console.error(error);
    throw new Error('Could not fetch most recent blog from halal-travel api');
  }
}

export function resolveBlogCoverImageUrl(data: BlogContent) {
  if (data.type !== 'Blog') {
    return `${appConfig.api.halalTravel.url}/hv/api/chatgpt/user/itinerary/coverimage/${data.coverImage}`;
  }

  return data.coverImage;
}

export interface BlogResponse {
  content: BlogContent[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
}

export interface BlogContent {
  id: number;
  coverImage: string;
  createdDate: string;
  description: string;
  title: string;
  destination: BlogDestination[];
  savedCount: number;
  userId: number;
  publishDate: string;
  type: BlogContentType;
  username: string | null;
  attractions: string[];
  interests: string[];
  bookmarked: boolean;
}

export enum BlogContentType {
  Blog = 'Blog',
  UserItinerary = 'User Itinerary',
}

export interface BlogDestination {
  location: string;
  state: string;
  country: string;
}
