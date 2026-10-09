# ADR 0001: Strict Schema Validation for Property Listings

## Status
Accepted

## Context
Inconsistent API payloads, out-of-bounds numeric values, non-standard state/ZIP formats, and unapproved property amenities risk causing runtime client errors and data corruption downstream.

## Decision
We enforce strict data validation at runtime using **Zod** as the single source of truth for both static TypeScript types (`z.infer`) and runtime validation schemas (`PropertyContractSchema`).
- Standardized fields: UUID format for IDs, 2-letter uppercase state code, US ZIP pattern.
- Explicit enum checks for `amenities` and strictly prohibited unknown attributes (`.strict()`).
- Compilation and unit testing powered by `@swc/jest`.

## Consequences
- **Positive:** Guarantees structural integrity before state management or UI rendering. Drops corrupted payloads early.
- **Negative:** Payload parsing introduces minimal runtime overhead; schema updates require modifying the centralized schema file.