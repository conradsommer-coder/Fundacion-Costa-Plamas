const uploadMarker = '/upload/';

const withCloudinaryTransform = (url: string, transforms: string[]) => {
  const cleanTransforms = transforms.filter(Boolean);

  if (!cleanTransforms.length || !url.includes(uploadMarker)) {
    return url;
  }

  return url.replace(uploadMarker, `${uploadMarker}${cleanTransforms.join(',')}/`);
};

export const cloudinaryImageUrl = (url: string, width: number) => (
  withCloudinaryTransform(url, ['f_auto', 'q_auto', `w_${width}`])
);

export const cloudinaryImageSrcSet = (url: string, widths: number[]) => (
  widths.map((width) => `${cloudinaryImageUrl(url, width)} ${width}w`).join(', ')
);

export const cloudinaryVideoUrl = (url: string, width: number) => (
  withCloudinaryTransform(url, ['q_auto:eco', `w_${width}`])
);

export const cloudinaryVideoPosterUrl = (url: string, width: number) => (
  withCloudinaryTransform(url.replace(/\.[^/.]+$/, '.jpg'), ['f_jpg', 'q_auto', `w_${width}`, 'so_0'])
);
