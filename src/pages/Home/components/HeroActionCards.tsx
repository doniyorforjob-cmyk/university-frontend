import React from 'react';
import { Link } from 'react-router-dom';
import PrefetchLink from '../../../components/shared/PrefetchLink';

interface HeroLink {
    id: string | number;
    title: string;
    url: string;
    icon: string; // Raw SVG
    isExternal: boolean;
}

interface HeroActionCardsProps {
    links?: HeroLink[] | null;
}

const HeroActionCards: React.FC<HeroActionCardsProps> = ({ links }) => {
    // Fallback links if none provided or null
    const safeLinks = Array.isArray(links) ? links : [];

    if (safeLinks.length === 0) return null;

    return (
        <div className="w-full relative z-20">
            <div className={`grid ${safeLinks.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} md:flex md:flex-wrap items-stretch w-full gap-2 md:gap-0`}>
                {safeLinks.map((card) => {
                    const content = (
                        <div className="group flex flex-col md:flex-row items-center justify-center text-center md:text-left px-4 lg:px-6 py-4 bg-white/5 md:bg-transparent hover:bg-white/10 transition-all duration-300 cursor-pointer h-full min-h-[100px] md:border-r md:border-white/5 md:last:border-r-0 rounded-lg md:rounded-none">
                            <div className="mb-2 md:mb-0 md:mr-4 flex-shrink-0">
                                {card.icon.trim().startsWith('<svg') ? (
                                    <div
                                        className="w-8 h-8 lg:w-10 lg:h-10 text-[#95BBFF] group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(149,187,255,0.4)]"
                                        dangerouslySetInnerHTML={{ __html: card.icon }}
                                    />
                                ) : (
                                    <img
                                        src={card.icon}
                                        alt={card.title}
                                        className="w-8 h-8 lg:w-10 lg:h-10 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(149,187,255,0.4)]"
                                    />
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white text-[11px] sm:text-xs lg:text-base font-bold tracking-tight leading-tight group-hover:text-blue-100 transition-colors uppercase md:normal-case max-w-[200px]">
                                    {card.title}
                                </h3>
                            </div>
                        </div>
                    );

                    // If multiple cards, they should grow to fill space on desktop. 
                    // If 1 card, it should not exceed a reasonable width.
                    const widthClass = safeLinks.length === 1
                        ? "w-full md:max-w-sm lg:max-w-md"
                        : "w-full md:flex-1 md:min-w-[250px]";

                    // Intercept "Rektorga murojaat" links and redirect to /contact
                    const cardTitle = card.title.toLowerCase();
                    const isRectorAppeal =
                        cardTitle.includes('rektorga murojaat') ||
                        cardTitle.includes('обращение к ректору') ||
                        cardTitle.includes('appeal to rector');

                    const finalUrl = isRectorAppeal ? '/contact' : card.url;
                    const finalIsExternal = isRectorAppeal ? false : card.isExternal;

                    return (
                        <div key={card.id} className={`${widthClass}`}>
                            {finalIsExternal ? (
                                <a
                                    href={finalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block h-full"
                                >
                                    {content}
                                </a>
                            ) : (
                                <PrefetchLink
                                    to={finalUrl}
                                    prefetch={true}
                                    className="block h-full"
                                >
                                    {content}
                                </PrefetchLink>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HeroActionCards;
