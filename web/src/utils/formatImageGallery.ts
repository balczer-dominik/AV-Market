export const formatImageGallery = (images: string[]) => {
  return images.map((image) => {
    return {
      original: `/ad/${image}.png`,
      thumbnail: `/ad/${image}.png`,
    };
  });
};
