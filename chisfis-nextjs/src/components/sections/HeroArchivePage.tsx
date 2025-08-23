import React, { FC } from 'react';
import { Breadcrumbs, BreadcrumbItem } from '@/shared/Breadcrumbs';

export interface SectionHeroArchivePageProps {
    className?: string;
    currentPage: string;
    currentTab: string;
    listingType?: string;
    rightImg?: string;
}

const HeroArchivePage: FC<SectionHeroArchivePageProps> = ({
                                                                     className = "",
                                                                     currentPage,
                                                                     currentTab,
                                                                     listingType,
                                                                     rightImg = "/images/hero-right.png"
                                                                 }) => {
    return (
        <div
            className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
            data-nc-id="HeroArchivePage"
        >
            <div className="flex flex-col lg:flex-row lg:items-center">
                <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
                    <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[110%]">
                        {currentPage}
                    </h2>
                    <div className="flex items-center text-base md:text-lg text-neutral-500 dark:text-neutral-400">
                        <i className="text-2xl las la-map-marked-alt"></i>
                        <span className="ml-2.5">Marokko</span>
                        <span className="mx-5">·</span>
                        <i className="text-2xl las la-home"></i>
                        <span className="ml-2.5">{currentTab}</span>
                    </div>
                </div>
                <div className="flex-grow">
                    <img className="w-full" src={rightImg} alt={currentPage} />
                </div>
            </div>
        </div>
    );
};

export default HeroArchivePage;