-- Fix database sequence issue for users table
-- This script resets the sequence to start from the next available ID

-- First, let's check the current maximum ID in the users table
SELECT MAX(id) as max_user_id FROM users;

-- Reset the sequence to start from the next available ID
-- Replace 'users_id_seq' with the actual sequence name if different
-- You can find the sequence name by running: \d users (in psql)

-- For PostgreSQL, reset the sequence
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

-- Alternative approach if the above doesn't work:
-- 1. Find the sequence name first:
-- SELECT pg_get_serial_sequence('users', 'id');

-- 2. Then reset it:
-- SELECT setval(pg_get_serial_sequence('users', 'id'), (SELECT MAX(id) FROM users));

-- For testing purposes, you can also manually set it to a higher value:
-- SELECT setval('users_id_seq', 25); -- Set to start from 26

-- Verify the sequence is reset
SELECT currval('users_id_seq') as current_sequence_value;
