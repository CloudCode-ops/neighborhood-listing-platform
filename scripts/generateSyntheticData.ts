import fs from 'fs';
import path from 'path';
import { PropertyContract } from '../src/app/schemas/property';

const sampleProperties: PropertyContract[] = [
  {
    property_id: 'e4d3c2b1-0a9b-8c7d-6e5f-4a3b2c1d0e9f',
    address_street: '123 Innovation Way',
    city: 'Austin',
    state: 'TX',
    zip_code: '78701',
    price: 650000,
    bedrooms: 3,
    bathrooms: 2,
    square_feet: 1850,
    amenities: ['Air Conditioning', 'Pool', 'Hardwood Floors'],
    local_sponsors: [
      {
        sponsor_id: '11111111-2222-3333-4444-555555555555',
        name: 'Austin Tech Realty',
        tier: 'Gold',
      },
    ],
  },
  {
    property_id: 'f5e4d3c2-1b0a-9c8d-7e6f-5a4b3c2d1e0f',
    address_street: '456 Ocean Avenue',
    city: 'Santa Monica',
    state: 'CA',
    zip_code: '90401',
    price: 1250000,
    bedrooms: 2,
    bathrooms: 2.5,
    square_feet: 1400,
    amenities: ['Balcony', 'In-Unit Laundry', 'Garage'],
    local_sponsors: [],
  },
];

const outputPath = path.join(__dirname, '../data/properties.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(sampleProperties, null, 2));

console.log(`Successfully generated ${sampleProperties.length} synthetic property records -> ${outputPath}`);