import { PropertyCard } from './components/PropertyCard';
import { Property } from './types/property';

const sampleProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Sunset Villa',
    address: '123 Ocean Drive',
    city: 'Malibu',
    price: 1250000,
    beds: 4,
    baths: 3,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Cozy Downtown Loft',
    address: '456 Main Street',
    city: 'Seattle',
    price: 680000,
    beds: 2,
    baths: 2,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Featured Neighborhood Properties
        </h1>
        <div className="grid grid-cols-1 gap-6">
          {sampleProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
}
