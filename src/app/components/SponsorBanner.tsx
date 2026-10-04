import React from 'react';
import { Sponsor } from '../types';

interface SponsorBannerProps {
  sponsor: Sponsor;
}

export const SponsorBanner: React.FC<SponsorBannerProps> = ({ sponsor }) => {
  return (
    <aside aria-label="Sponsored Content" className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-6 flex items-center justify-between">
      <div>
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-200 px-2 py-0.5 rounded">
          Sponsored
        </span>
        <h3 className="text-lg font-bold text-gray-900 mt-1">{sponsor.companyName}</h3>
        <p className="text-sm text-gray-700">{sponsor.tagline}</p>
      </div>
      <a
        href={sponsor.sponsorUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-blue-700 underline hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        Visit {sponsor.companyName} <span className="sr-only">(opens in new window)</span>
      </a>
    </aside>
  );
};