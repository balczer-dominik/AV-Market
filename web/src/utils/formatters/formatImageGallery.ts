import { formatAdSrc } from "@utils/formatters/formatLinks";

export const formatImageGallery = (images: string[]) => {
  return images.map((image) => {
    return {
      original: formatAdSrc(image),
      thumbnail: formatAdSrc(image),
    };
  });
};
