import { Locale } from '../../../i18n-config';
import { fetchStrapiAPI } from './client';
import { Localizations } from './i18n';
import { ImageList } from './media';

export function fetchLandingPage({ locale }: { locale: Locale }) {
  try {
    return fetchStrapiAPI<LandingPageResponse>('/landing-new', {
      populate: '*',
      locale,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Could not fetch landing page from strapi');
  }
}

export interface LandingPageResponse {
  data: LandingPageData;
  // eslint-disable-next-line
  meta: {};
}

export interface LandingPageData {
  id: number;
  attributes: LandingPageAttributes;
}

export interface LandingPageAttributes {
  HeaderTitle: string;
  UpcomingEventTitle: string;
  UpcomingEventSubtitle: string;
  SeeMoreButton: string;
  FromPressTitle: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  OurFunDocumentation: string;
  LandingCarousel: LandingPageCarouselItem[];
  SearchGroup: LandingPageSearchGroup;
  ActivityGroup: LandingPageActivityGroup;
  EditorsChoiceGroup: LandingPageEditorsChoiceGroup;
  EventList: LandingPageEvent[];
  OurFunDocumentationImg: ImageList;
  PressImg: ImageList;
  Footer: LandingPageFooter;
  Header: LandingPageHeader;
  localizations: Localizations;
}

export interface LandingPageCarouselItem {
  id: number;
  ImgNum: string;
  ImgDesc: string;
}

export interface LandingPageSearchGroup {
  id: number;
  SubtitleMostPeople: string;
  Suggestion1: string;
  Suggestion2: string;
  Suggestion3: string;
  TitleDiscover: string;
}

export interface LandingPageActivityGroup {
  id: number;
  ActivitiesTitle: string;
  ActivityNameTitle: string;
  ActivityNameDesc: string;
  InterestenButton: string;
  ShowOtherButton: string;
}

export interface LandingPageEditorsChoiceGroup {
  id: number;
  EditorsChoiceTitle: string;
  EditorsChoiceName: string;
  EditorsChoiceDesc: string;
  EditorsChoiceBlogTitle: string;
  EditorsChoiceBlogDesc: string;
}

export interface LandingPageEvent {
  id: number;
  StateName: string;
  EventDate: string;
  EventTitle2: string;
  EventDesc: string;
  EventTitle: string;
}

export interface LandingPageFooter {
  id: number;
  CopyrightSubtitle: string;
}

export interface LandingPageHeader {
  id: number;
  HomeButton: string;
  StorefrontButton: string;
  TravelIdeaButton: string;
  BecomeCreatorButton: string;
  ContactUsButton: string;
  SignInButton: string;
  SignUpButton: string;
}
