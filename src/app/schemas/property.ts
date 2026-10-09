import { z } from 'zod';

export const PropertySponsorSchema = z.object({
  sponsor_id: z.string().uuid(),
  name: z.string().min(2),
  tier: z.enum(['Gold', 'Silver', 'Bronze']),
}).strict();

export const AllowedAmenities = [
  'Air Conditioning',
  'Balcony',
  'Dishwasher',
  'Garage',
  'Hardwood Floors',
  'In-Unit Laundry',
  'Pool',
  'Pet Friendly',
] as const;

export const PropertyContractSchema = z.object({
  property_id: z.string().uuid(),
  address_street: z.string().min(5).max(100),
  city: z.string().min(2).max(50),
  state: z.string().regex(/^[A-Z]{2}$/, "Must be a 2-letter uppercase state code"),
  zip_code: z.string().regex(/^[0-9]{5}(-[0-9]{4})?$/, "Invalid US Zip Code format"),
  price: z.number().int().nonnegative(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().nonnegative(),
  square_feet: z.number().int().positive(),
  amenities: z.array(z.enum(AllowedAmenities)).refine(
    (items) => new Set(items).size === items.length,
    { message: "Amenities must contain unique values" }
  ),
  local_sponsors: z.array(PropertySponsorSchema),
}).strict();

export type PropertyContract = z.infer<typeof PropertyContractSchema>;
export type PropertySponsor = z.infer<typeof PropertySponsorSchema>;