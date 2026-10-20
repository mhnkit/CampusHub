-- Adds database-backed content for personal, editable text notes on projects
-- where subjects.sql has already been applied.
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS content TEXT;
