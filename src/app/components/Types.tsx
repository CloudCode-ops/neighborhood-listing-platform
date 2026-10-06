// Property Interface
export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  imageUrl: string;
}

// Sponsor Interface
export interface Sponsor {
  id: string;
  companyName: string;
  tagline: string;
  logoUrl: string;
  sponsorUrl: string;
}

// Search & Filter Parameters Interface
export interface FilterState {
  searchQuery: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  city?: string;
}