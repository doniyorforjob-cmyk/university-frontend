import { HomeMediaData } from '../../../types/home.types';
import { getImageUrl, getLocalized } from '../../../utils/apiUtils';

// Helper to extract YouTube ID from various URL formats
const extractYoutubeId = (url: string): string => {
  if (!url) return '';
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
};

// Helper to get YouTube thumbnail
const getYoutubeThumbnail = (videoId: string): string => {
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const transformVideoGalleryData = (apiData: any): HomeMediaData => {
  console.log('Transforming media data:', apiData);
  if (!apiData) return { videos: [], photos: [] };

  const rawItems = Array.isArray(apiData) ? apiData : (Array.isArray(apiData.data) ? apiData.data : []);
  const nestedContainer = (!Array.isArray(apiData) && !Array.isArray(apiData.data)) ? (apiData.data || apiData) : null;

  let rawVideos = nestedContainer?.videos || [];
  let rawPhotos = nestedContainer?.photos || [];

  if (Array.isArray(rawItems)) {
    rawItems.forEach((item: any) => {
      if (!item) return;
      const fields = item.fields || {};
      if (fields.gallery || fields.cover_image || fields['cover-image'] || item.gallery) {
        rawPhotos.push(item);
      } else if (fields.thumbnail || fields.youtube_id || item.youtube_id || fields.youtube || item.youtube) {
        rawVideos.push(item);
      }
    });
  }

  const finalVideos = Array.isArray(rawVideos) ? rawVideos : [];
  const finalPhotos = Array.isArray(rawPhotos) ? rawPhotos : [];

  console.log('[DEBUG] Transformer - Final Videos Count:', finalVideos.length);
  console.log('[DEBUG] Transformer - Final Photos Count:', finalPhotos.length);

  const videos = finalVideos
    .map((video: any) => {
      if (!video) return null;
      const fields = video.fields || {};

      // YouTube ID extraction
      let videoId = String(video.youtube_id || fields.youtube_id || video.id || fields.id || '');
      const youtubeUrl = fields.youtube || video.youtube || '';

      if (youtubeUrl && !videoId) {
        videoId = extractYoutubeId(youtubeUrl);
      } else if (youtubeUrl && videoId.length !== 11) {
        // If we have a full URL in the ID field or just a URL field, try to extract
        const extracted = extractYoutubeId(youtubeUrl || videoId);
        if (extracted) videoId = extracted;
      }

      // Thumbnail handling: Priority is manual thumbnail > YouTube auto-thumbnail
      const rawThumbnail = fields.thumbnail || video.thumbnail || video.thumbnail_url || video.image;
      let thumbnailPath = typeof rawThumbnail === 'object' && rawThumbnail !== null
        ? (rawThumbnail.url || rawThumbnail.path)
        : rawThumbnail;

      if (!thumbnailPath && videoId) {
        thumbnailPath = getYoutubeThumbnail(videoId);
      }

      return {
        id: videoId,
        title: getLocalized(fields.title || video.title || '', 'uz'),
        description: getLocalized(fields.description || video.description || video.content || '', 'uz'),
        thumbnail: thumbnailPath ? (thumbnailPath.startsWith('http') ? thumbnailPath : getImageUrl(thumbnailPath)) : '',
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
      console.log(`[DEBUG] Transformer - Processing Photo Item:`, { id: photo.id, fields: Object.keys(fields) });

      const rawCover = fields['cover-image'] || fields.cover_image || photo.cover_image || photo['cover-image'] || fields.image || photo.image || fields.photo || photo.photo || fields.picture || photo.picture || fields.file || photo.file || photo.url || '';
      const coverPath = typeof rawCover === 'object' && rawCover !== null ? (rawCover.url || rawCover.path) : rawCover;

      console.log(`[DEBUG] Transformer - Photo "${fields.title || photo.title || 'Untitled'}" rawCover:`, rawCover);
      console.log(`[DEBUG] Transformer - Photo "${fields.title || photo.title || 'Untitled'}" coverPath:`, coverPath);

      const rawGallery = fields.gallery || photo.gallery || fields.images || photo.images || fields.photos || photo.photos || [];
      const gallery = Array.isArray(rawGallery)
        ? rawGallery.map((img: any) => {
          const path = typeof img === 'string' ? img : (img.url || img.path);
          return getImageUrl(path);
        })
        : [];

      const finalCover = getImageUrl(coverPath);
      console.log(`[DEBUG] Transformer - Photo "${fields.title || photo.title || 'Untitled'}" finalCover:`, finalCover);

      if (finalCover.includes('logo.png')) {
        console.warn(`[DEBUG] Transformer - Photo "${fields.title || photo.title || 'Untitled'}" rejected: Falling back to logo (no real image found).`);
      }

      return {
        id: String(photo.id || fields.id || photo.uuid || photo.slug || Math.random()),
        title: getLocalized(fields.title || photo.title || '', 'uz'),
        cover_image: finalCover,
        gallery: gallery,
        created_at: String(photo.created_at || fields.created_at || photo.uploadDate || new Date().toISOString()),
        updated_at: String(photo.updated_at || fields.updated_at || photo.created_at || new Date().toISOString()),
        views: Number(fields.views || photo.views || 0)
      } as any;
    })
    .filter((p: any): p is any => {
      const isValid = p !== null && p.id && !p.cover_image.includes('logo.png');
      if (!isValid && p) {
        console.log(`[DEBUG] Transformer - Item "${p.title}" filtered out. Reason: ${!p.id ? 'No ID' : 'Missing cover image'}`);
      }
      return isValid;
    });

  console.log('[DEBUG] Transformer - Final Processed Photos:', photos.map(p => p.title));
  console.log('[DEBUG] Transformer - Final Processed Videos:', videos.map(v => v.title));

  return {
    videos: videos,
    photos: photos
  };
};