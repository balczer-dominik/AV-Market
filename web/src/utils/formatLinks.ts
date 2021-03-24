import { Categories, MainCategory } from "@components/MenuRoutes";

export const formatAdSrc = (src: string) => `/ad/${src}.png`;
export const formatAdLink = (id: number) => `/ad/view/${id}`;
export const formatProfileLink = (id: number) => `/profile/view/${id}`;
export const formatUsersAdsLink = (id: number) => `/profile/ads/${id}`;
export const formatAvatarLink = (src: string) => `/avatar/${src}.png`;
export const formatAdsLink = (id: number) => `/profile/ads/${id}`;
export const formatBrowseCategory = (category: MainCategory) =>
  `/ad/${Categories[category].route}`;
export const formatBrowseSubCategory = (
  maincategory: MainCategory,
  subcategory: string
) =>
  `/ad/${Categories[maincategory].route}/${
    Categories[maincategory].subcategories.find((sc) => sc.title == subcategory)
      .route
  }`;
