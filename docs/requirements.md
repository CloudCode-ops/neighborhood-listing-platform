# Product Requirements & Acceptance Criteria

## Feature Specification
Implementation of the **Local Merchant Services & Client Appointment Subsystem**.

## User Stories

### Story 1 (Service Provider / Merchant)
- **Scope Estimate:** Medium
- **Traceability:** Linked to `supabase/migrations/20261029140000_exam_services_persistence.sql` (`services` table) and `app/api/services/route.ts` (POST handler).
- **Description:** As an authenticated local service provider, I want to submit service listing drafts (e.g., plumbing, home staging, inspection) with hourly rates so that clients can book appointments once verified by administrators.
- **Acceptance Criteria (Given / When / Then):**
  - **Given** an authenticated merchant with a valid session (`auth.uid()`),
  - **When** submitting a service offering payload with a valid title, hourly rate, duration, and radius,
  - **Then** the service is saved with `status = 'draft'` and linked securely to the provider's `provider_id`.

### Story 2 (Neighborhood Client / Resident)
- **Scope Estimate:** Small
- **Traceability:** Linked to `supabase/migrations/20261029140000_exam_services_persistence.sql` (RLS policies) and `app/api/services/route.ts` (GET handler).
- **Description:** As a neighborhood resident, I want to view approved services categorized by neighborhood district and request an appointment booking without viewing bookings or contact information submitted by other clients.
- **Acceptance Criteria (Given / When / Then):**
  - **Given** an anonymous visitor querying the platform,
  - **When** querying service offerings,
  - **Then** only records with `status = 'approved'` and active coverage zones are returned, hiding all unapproved drafts and client booking details.

### Story 3 (Platform Admin)
- **Scope Estimate:** Large
- **Traceability:** Linked to `supabase/migrations/20261029140000_exam_services_persistence.sql` (Admin RLS bypass / policies) and administrative management endpoints.
- **Description:** As a platform administrator, I want unrestricted oversight to approve service listings, deactivate bad actors, and audit all client bookings.
- **Acceptance Criteria (Given / When / Then):**
  - **Given** an authenticated user with an `admin` role in the `profiles` table,
  - **When** accessing service moderation or booking audit logs,
  - **Then** full read and write access across all schemas is granted via elevated RLS policies.
