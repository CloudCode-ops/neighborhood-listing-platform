'use client';
import React, { useState } from 'react';
import { Property } from '../types/property';

interface PropertyCardProps {
  property: Property;
  onFavoriteToggle?: (id: string, isFav: boolean) => void;
  onContactAgent?: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onFavoriteToggle,
  onContactAgent,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !isFavorited;
    setIsFavorited(nextState);
    onFavoriteToggle?.(property.id, nextState);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onContactAgent?.(property.id);
  };

  return (
    <article className="group flex flex-col md:flex-row overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative md:w-2/5 aspect-[4/3] overflow-hidden">
        <img
          src={property.imageUrl}
          alt={`${property.title} located at ${property.address}, ${property.city}`}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={isFavorited ? `Remove ${property.title} from favorites` : `Add ${property.title} to favorites`}
          aria-pressed={isFavorited}
          className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-gray-700 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        >
          <svg className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'fill-none stroke-current'}`} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600">
            <a
              href={`/properties/${property.id}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 rounded"
            >
              {property.title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {property.address}, {property.city}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">
            ${property.price.toLocaleString()}
          </p>
          <button
            type="button"
            onClick={handleContactClick}
            aria-label={`Call agent regarding ${property.title}`}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            Contact Agent
          </button>
        </div>
      </div>
    </article>
  );
};