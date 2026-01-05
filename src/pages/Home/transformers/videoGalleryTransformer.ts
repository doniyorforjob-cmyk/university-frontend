import { HomeMediaData } from '../../../types/home.types';
import { getImageUrl, getLocalized } from '../../../utils/apiUtils';

export const transformVideoGalleryData = (apiData: any): HomeMediaData => {
  console.log('Transforming media data:', apiData);
  if (!apiData) return { videos: [], photos: [] };

  // 1. Identify where the data is
  // Case A: { data: [...] } (Flat list from a collection)
  // Case B: { data: { videos: [], photos: [] } } (Nested structure)
  // Case C: [...] (Flat list directly)

  const rawItems = Array.isArray(apiData) ? apiData : (Array.isArray(apiData.data) ? apiData.data : []);
  const nestedContainer = (!Array.isArray(apiData) && !Array.isArray(apiData.data)) ? (apiData.data || apiData) : null;

  let rawVideos = nestedContainer?.videos || [];
  let rawPhotos = nestedContainer?.photos || [];

  // If we have a flat list, we need to sort them into types
  if (Array.isArray(rawItems)) {
    rawItems.forEach((item: any) => {
      if (!item) return;
      const fields = item.fields || {};
      // If it has gallery OR cover_image, it's a photo/album
      if (fields.gallery || fields.cover_image || fields['cover-image'] || item.gallery) {
        rawPhotos.push(item);
      } else if (fields.thumbnail || fields.youtube_id || item.youtube_id) {
        rawVideos.push(item);
      }
    });
  }

  // Ensure rawVideos and rawPhotos are arrays
  const finalVideos = Array.isArray(rawVideos) ? rawVideos : [];
  const finalPhotos = Array.isArray(rawPhotos) ? rawPhotos : [];

  // Deduplicate and process
  const videos = finalVideos
    .map((video: any) => {
      if (!video) return null;
      const fields = video.fields || {};

      // Handle image objects if thumbnail is an object
      const rawThumbnail = fields.thumbnail || video.thumbnail || video.thumbnail_url || video.image;
      const thumbnailPath = typeof rawThumbnail === 'object' ? (rawThumbnail.url || rawThumbnail.path) : rawThumbnail;

      return {
        id: String(video.id || fields.id || video.youtube_id || video.uuid || ''),
        title: getLocalized(fields.title || video.title || '', 'uz'),
        description: getLocalized(fields.description || video.description || video.content || '', 'uz'),
        thumbnail: getImageUrl(thumbnailPath),
        created_at: String(video.created_at || fields.created_at || video.uploadDate || new Date().toISOString()),
        updated_at: String(video.updated_at || fields.updated_at || video.created_at || new Date().toISOString()),
        views: Number(fields.views || video.views || 0)
      } as any;
    })
    .filter((v: any): v is any => v !== null && v.id);

  const photos = finalPhotos
    .map((photo: any) => {
      if (!photo) return null;
      const fields = photo.fields || {};

      // Handle image objects if cover-image is an object
      const rawCover = fields['cover-image'] || fields.cover_image || photo.cover_image || photo.image || photo.url || '';
      const coverPath = typeof rawCover === 'object' ? (rawCover.url || rawCover.path) : rawCover;

      const rawGallery = fields.gallery || photo.gallery || [];
      const gallery = Array.isArray(rawGallery)
        ? rawGallery.map((img: any) => {
          const path = typeof img === 'string' ? img : (img.url || img.path);
          return getImageUrl(path);
        })
        : [];

      return {
        id: String(photo.id || fields.id || photo.uuid || ''),
        title: getLocalized(fields.title || photo.title || '', 'uz'),
        cover_image: getImageUrl(coverPath),
        gallery: gallery,
        created_at: String(photo.created_at || fields.created_at || photo.uploadDate || new Date().toISOString()),
        updated_at: String(photo.updated_at || fields.updated_at || photo.created_at || new Date().toISOString()),
        views: Number(fields.views || photo.views || 0)
      } as any;
    })
    .filter((p: any): p is any => p !== null && p.id && p.cover_image);

  return {
    videos: videos,
    photos: photos
  };
};