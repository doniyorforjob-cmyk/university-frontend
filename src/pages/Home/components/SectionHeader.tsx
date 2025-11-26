import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Container from '../../../components/shared/Container';

interface SectionHeaderProps {
  title: string;
  seeAllLink?: string;
  seeAllText?: string | null;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  seeAllLink,
  seeAllText,
  className = ''
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-1 bg-primary h-8 mr-4"></div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          </div>
          <div className="flex-1 mx-8">
            <div className="h-px bg-gray-300"></div>
          </div>
          {seeAllLink && seeAllText && (
            <Link
              to={seeAllLink}
              className="group inline-flex items-center text-[#0E104B] font-semibold transform transition-all duration-200 hover:scale-105 hover:text-[#0E104B]-focus"
            >
              {seeAllText}
              <ChevronRightIcon className="w-5 h-5 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
};

export default SectionHeader;