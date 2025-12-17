import { HomeStatsData } from '../../../services/homeService';

export const transformStatsData = (apiData: any): HomeStatsData => {
  // Handle different API response formats
  const stats = apiData.stats || apiData.data || apiData;

  if (Array.isArray(stats)) {
    return {
      stats: stats.map(stat => ({
        id: stat.id || stat.key || Math.random(),
        text: stat.text || stat.label || stat.title || '',
        end: typeof stat.end === 'number' ? stat.end : parseInt(stat.value) || 0,
        plus: stat.plus || stat.showPlus || false
      }))
    };
  }

  // Handle object format
  if (typeof stats === 'object') {
    return {
      stats: [
        {
          id: 1,
          text: stats.studentsLabel || stats.students_text || "O'qituvchilar",
          end: stats.teachers || stats.staff || 0,
          plus: true
        },
        {
          id: 2,
          text: stats.teachersLabel || stats.teachers_text || "Talabalar",
          end: stats.students || 0,
          plus: true
        },
        {
          id: 3,
          text: stats.departmentsLabel || stats.departments_text || "Fakultetlar",
          end: stats.departments || 0,
          plus: false
        },
        {
          id: 4,
          text: stats.graduatesLabel || stats.graduates_text || "Bitiruvchilar",
          end: stats.graduates || 0,
          plus: true
        }
      ]
    };
  }

  // Default fallback
  return {
    stats: [
      { id: 1, text: "O'qituvchilar", end: 150, plus: true },
      { id: 2, text: "Talabalar", end: 5000, plus: true },
      { id: 3, text: "Fakultetlar", end: 8, plus: false },
      { id: 4, text: "Bitiruvchilar", end: 12000, plus: true },
    ]
  };
};