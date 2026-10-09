import fs from 'fs';
import path from 'path';
import { PropertyGuard } from '../components/PropertyGuard';

function getProperties() {
  const filePath = path.join(process.cwd(), 'data/properties.json');
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

export default function HomePage() {
  const rawProperties = getProperties();

  return (
    <main className="max-w-5xl mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">Neighborhood Property Listings</h1>

      {rawProperties.length === 0 ? (
        <p className="text-gray-500">No properties available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rawProperties.map((rawItem: unknown, index: number) => (
            <PropertyGuard key={index} rawData={rawItem}>
              {(property) => (
                <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {property.address_street}
                    </h2>
                    <span className="text-lg font-bold text-green-700">
                      ${property.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">
                    {property.city}, {property.state} {property.zip_code}
                  </p>

                  <div className="flex gap-4 text-sm text-gray-500 mb-4 border-t border-b py-2">
                    <span><strong>{property.bedrooms}</strong> Beds</span>
                    <span><strong>{property.bathrooms}</strong> Baths</span>
                    <span><strong>{property.square_feet.toLocaleString()}</strong> Sq Ft</span>
                  </div>

                  {property.amenities.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Amenities
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {property.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {property.local_sponsors.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Sponsored By
                      </p>
                      {property.local_sponsors.map((sponsor) => (
                        <span
                          key={sponsor.sponsor_id}
                          className="inline-block text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded px-2 py-0.5"
                        >
                          {sponsor.name} ({sponsor.tier})
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </PropertyGuard>
          ))}
        </div>
      )}
    </main>
  );
}