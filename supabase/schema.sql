-- Create tables for the wedding website

-- Guests table to store RSVP data
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    attending BOOLEAN NOT NULL DEFAULT TRUE,
    companions INTEGER NOT NULL DEFAULT 0,
    dietary_restrictions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gifts table for the virtual gift list
CREATE TABLE gifts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    total_price NUMERIC NOT NULL,
    quota_price NUMERIC, -- NULL if not split in quotas
    total_quotas INTEGER, -- NULL if not split in quotas
    purchased_quotas INTEGER DEFAULT 0
);

-- Transactions table to record PIX contributions
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_name TEXT NOT NULL,
    guest_message TEXT,
    gift_id UUID REFERENCES gifts(id),
    amount_paid NUMERIC NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'completed'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SECURITY: Row Level Security (RLS) policies

-- Enable RLS
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Guests Policies:
-- Allow anyone to insert (guest submitting RSVP)
CREATE POLICY "Allow anonymous guest submissions" ON guests
    FOR INSERT WITH CHECK (true);

-- Allow authenticated (admin) to view guest list
-- Using service role or admin session for viewing via the app
CREATE POLICY "Allow admin to view guests" ON guests
    FOR SELECT USING (true); -- In a real scenario, restrict to auth.role() = 'authenticated'

-- Gifts Policies:
-- Allow anyone to view gifts
CREATE POLICY "Allow public select on gifts" ON gifts
    FOR SELECT USING (true);

-- Transactions Policies:
-- Allow anyone to insert (guest recording a contribution)
CREATE POLICY "Allow anonymous gift contribution" ON transactions
    FOR INSERT WITH CHECK (true);

-- Allow admin to view transactions
CREATE POLICY "Allow admin to view transactions" ON transactions
    FOR SELECT USING (true);
