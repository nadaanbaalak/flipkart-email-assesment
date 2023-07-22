export enum FilterSlugEnum {
  FAVOURITE = "favourites",
  READ = "read",
  UNREAD = "unread",
}

export const FILTERS = [
  { slug: FilterSlugEnum.READ, displayName: "Read" },
  { slug: FilterSlugEnum.UNREAD, displayName: "Unread" },
  { slug: FilterSlugEnum.FAVOURITE, displayName: "Favourite" },
];

export const FAVOURITE_EMAIL_LOCAL_STORAGE_KEY = "favourite-emails";

export const READ_EMAIL_LOCAL_STORAGE_KEY = "read-email";

export const ITEMS_PER_PAGE = 10;
