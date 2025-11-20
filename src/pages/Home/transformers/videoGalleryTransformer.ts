import { HomeVideoGalleryData } from '../../../api/homeApi';

export const transformVideoGalleryData = (apiData: any): HomeVideoGalleryData => {
  const videos = apiData.videos || apiData.data || apiData.gallery || [];

  return {
    videos: videos.map((video: any) => ({
      id: video.id || video.videoId || video.youtube_id || '',
      title: video.title || video.name || '',
      description: video.description || video.content || '',
      thumbnail: video.thumbnail || video.thumbnail_url || video.image || '',
      category: video.category || video.type || 'General',
      uploadDate: video.uploadDate || video.upload_date || video.date || new Date().toISOString()
    }))
  };
};