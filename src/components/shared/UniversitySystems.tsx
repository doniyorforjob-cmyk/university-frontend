import React from 'react';
import { homeApi } from '../../services/homeService';
import { useStandardSection } from '../../pages/Home/hooks/useStandardSection';
import { SystemsContainer } from './cards';

const UniversitySystems = React.memo(() => {
  const { data, loading } = useStandardSection(
    'university-systems',
    homeApi.getUniversitySystemsData
  );

  if (loading || !data) {
    return (
      <div className="bg-white p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <SystemsContainer
      title="Universitet tizimlari"
      systems={data.systems}
      quickLinks={data.quickLinks}
      variant="sidebar"
    />
  );
});

UniversitySystems.displayName = 'UniversitySystems';

export default UniversitySystems;