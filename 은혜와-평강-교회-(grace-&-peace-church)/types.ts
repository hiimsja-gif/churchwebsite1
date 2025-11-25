export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  scripture: string;
  thumbnailUrl: string;
  videoUrl?: string; // Optional for placeholder
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: '일반' | '모임' | '행사';
  content: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
}

export interface MinistryInfo {
  id: string;
  name: string;
  description: string; // Short summary for list view
  longDescription?: string; // Full detailed text
  target: string;
  time: string;
  location?: string;
  leaders?: string;
  image: string;
}

export interface NewcomerRegistration {
  id: string;
  name: string;
  phone: string;
  birthYear: string;
  address: string;
  description: string;
  date: string;
  status: '접수' | '연락완료' | '등록완료';
}

export interface MinistryInquiry {
  id: string;
  ministryName: string;
  ministryId: string;
  name: string;
  phone: string;
  message: string;
  date: string;
  status: '미확인' | '확인완료';
}

export enum Page {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  SERMONS = 'SERMONS',
  MINISTRY = 'MINISTRY',
  MINISTRY_DETAIL = 'MINISTRY_DETAIL',
  GALLERY = 'GALLERY',
  NOTICE_DETAIL = 'NOTICE_DETAIL',
  CONTACT = 'CONTACT',
  ADMIN = 'ADMIN',
}