import { HomeStatsData } from '../../../types/home.types';

export const transformStatsData = (apiData: any): HomeStatsData => {
  const rawItems = Array.isArray(apiData)
    ? apiData
    : (Array.isArray(apiData?.data) ? apiData.data : (apiData?.data ? [apiData.data] : []));

  const stats = rawItems.map((item: any) => {
    const fields = item.fields || {};
    return {
      id: item.uuid || item.id || Math.random(),
      text: fields.text || item.text || '',
      end: Number(fields.end) || Number(item.end) || 0,
      plus: fields.plus === true || item.plus === true,
      order: Number(fields.order) || 0
    };
  }).sort((a: any, b: any) => a.order - b.order);

  return {
    stats: stats,
    // Universitet hududi haqidagi ma'lumot hozircha statik qoldiriladi
    universityArea: {
      area: 1500,
      unit: 'ga',
      image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  };
};