import { PropertyContractSchema } from '../src/app/schemas/property';

describe('PropertyContract Runtime Validation', () => {
  const validRecord = {
    property_id: 'a3b9c8d1-7e2f-4a5b-9c8d-1e2f3a4b5c6d',
    address_street: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zip_code: '97477',
    price: 450000,
    bedrooms: 4,
    bathrooms: 2.5,
    square_feet: 2200,
    amenities: ['Garage', 'In-Unit Laundry', 'Pet Friendly'],
    local_sponsors: [
      {
        sponsor_id: 'c1d2e3f4-a5b6-7c8d-9e0f-1a2b3c4d5e6f',
        name: 'Springfield National Bank',
        tier: 'Gold',
      },
    ],
  };

  test('Valid Record: passes validation without errors', () => {
    const result = PropertyContractSchema.safeParse(validRecord);
    expect(result.success).toBe(true);
  });

  test('Invalid Record 1: missing property_id', () => {
    const { property_id, ...invalid } = validRecord;
    const result = PropertyContractSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  test('Invalid Record 2: negative price', () => {
    const invalid = { ...validRecord, price: -5000 };
    const result = PropertyContractSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  test('Invalid Record 3: bad ZIP code format', () => {
    const invalid = { ...validRecord, zip_code: '974770' };
    const result = PropertyContractSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  test('Invalid Record 4: unknown/additional property field', () => {
    const invalid = { ...validRecord, unknown_field: 'unauthorized_payload' };
    const result = PropertyContractSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});