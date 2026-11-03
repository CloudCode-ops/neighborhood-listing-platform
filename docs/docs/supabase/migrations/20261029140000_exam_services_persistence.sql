-- Exam Migration: Local Merchant Services & Client Appointment Subsystem
-- Target: neighborhood-listing-platform

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- 1. Create services table
create table if not exists public.services (
    id uuid default uuid_generate_v4() primary key,
    provider_id uuid references auth.users(id) on delete cascade not null,
    title text not null,
    description text,
    hourly_rate numeric(10,2) not null check (hourly_rate >= 0),
    duration_minutes integer default 60 not null,
    status text default 'draft' check (status in ('draft', 'pending', 'approved', 'rejected')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.services enable row level security;

-- 3. RLS Policies
-- Providers can manage their own drafts/listings
create policy "Providers can manage own services"
    on public.services
    for all
    using (auth.uid() = provider_id)
    with check (auth.uid() = provider_id);

-- Public/Clients can view approved services only
create policy "Public can view approved services"
    on public.services
    for select
    using (status = 'approved');
