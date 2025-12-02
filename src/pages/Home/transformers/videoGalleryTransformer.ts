import { HomeMediaData } from '../../../api/homeApi';

export const transformVideoGalleryData = (apiData: any): HomeMediaData => {
  const videos = apiData.videos || apiData.data || apiData.gallery || [];
  const photos = apiData.photos || apiData.images || apiData.photoGallery || [];

  return {
    videos: videos.map((video: any) => ({
      id: video.id || video.videoId || video.youtube_id || '',
      title: video.title || video.name || '',
      description: video.description || video.content || '',
      thumbnail: video.thumbnail || video.thumbnail_url || video.image || '',
      category: video.category || video.type || 'General',
      uploadDate: video.uploadDate || video.upload_date || video.date || new Date().toISOString()
    })),
    photos: photos.map((photo: any) => ({
      id: photo.id || photo.photoId || photo.imageId || '',
      title: photo.title || photo.name || '',
      image: photo.image || photo.url || photo.src || '',
      category: photo.category || photo.type || 'General',
      uploadDate: photo.uploadDate || photo.upload_date || photo.date || new Date().toISOString()
    }))
  };
};