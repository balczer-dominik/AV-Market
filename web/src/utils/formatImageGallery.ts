import { formatAdSrc } from "@utils/formatLinks";

export const formatImageGallery = (images: string[]) => {
  return images.map((image) => {
    return {
      original: formatAdSrc(image),
      thumbnail: formatAdSrc(image),
    };
  });
};
