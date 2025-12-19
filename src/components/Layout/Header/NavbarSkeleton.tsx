import React from 'react';

interface NavbarSkeletonProps {
    isSticky: boolean;
}

const NavbarSkeleton: React.FC<NavbarSkeletonProps> = ({ isSticky }) => {
    return (
        <div className="flex h-full items-center space-x-1 animate-pulse">
            {/* Home icon placeholder - only if sticky */}
            {isSticky && (
                <div className="w-12 h-10 mx-2 bg-white/20 rounded-md"></div>
            )}

            {/* Nav items placeholders */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                    key={item}
                    className="h-6 mx-3 bg-white/20 rounded-md"
                    style={{ width: `${Math.floor(Math.random() * 40) + 80}px` }}
                ></div>
            ))}
        </div>
    );
};

export default NavbarSkeleton;
