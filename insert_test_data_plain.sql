-- Insert test data with plain text passwords for testing
-- This script inserts sample users, roles, permissions, doctors, patients, and appointments
-- Using plain text passwords for testing (NOT for production)

-- First, let's insert roles
INSERT INTO roles (id, name) VALUES 
(1, 'ADMIN'),
(2, 'DOCTOR'),
(3, 'PATIENT'),
(4, 'RECEPTIONIST')
ON CONFLICT DO NOTHING;

-- Insert permissions
INSERT INTO permission (id, name) VALUES 
(1, 'READ_PATIENT'),
(2, 'WRITE_PATIENT'),
(3, 'READ_DOCTOR'),
(4, 'WRITE_DOCTOR'),
(5, 'READ_APPOINTMENT'),
(6, 'WRITE_APPOINTMENT'),
(7, 'ADMIN_ACCESS')
ON CONFLICT DO NOTHING;

-- Insert roles_permissions mappings
INSERT INTO roles_permissions (role_id, permissions_id) VALUES 
-- ADMIN has all permissions
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7),
-- DOCTOR can read/write patients and appointments
(2, 1), (2, 2), (2, 5), (2, 6),
-- PATIENT can read their own data and appointments
(3, 1), (3, 5),
-- RECEPTIONIST can read/write patients and appointments
(4, 1), (4, 2), (4, 5), (4, 6)
ON CONFLICT DO NOTHING;

-- Insert sample users with plain text passwords for testing
INSERT INTO users (id, email, first_name, last_name, password, gender, role_id) VALUES
-- Admin user
(1, 'admin@hospital.com', 'System', 'Administrator', 'admin123', 'MALE', 1),
-- Doctors (role_id = 2)
(2, 'sophia.chen@example.com', 'Sophia', 'Chen', 'doctor123', 'FEMALE', 2),
(3, 'dara.sok@example.com', 'Dara', 'Sok', 'doctor123', 'MALE', 2),
(4, 'vichea.meas@example.com', 'Vichea', 'Meas', 'doctor123', 'MALE', 2),
(5, 'sreyneang.khim@example.com', 'Sreyneang', 'Khim', 'doctor123', 'FEMALE', 2),
(6, 'sophal.rith@example.com', 'Sophal', 'Rith', 'doctor123', 'MALE', 2),
(7, 'dalis.srean@example.com', 'Dalis', 'Srean', 'doctor123', 'FEMALE', 2),
(8, 'rina.chhay@example.com', 'Rina', 'Chhay', 'doctor123', 'FEMALE', 2),
(9, 'piseth.vann@example.com', 'Piseth', 'Vann', 'doctor123', 'MALE', 2),
(10, 'chanra.long@example.com', 'Chanra', 'Long', 'doctor123', 'MALE', 2),
-- Patients (role_id = 3) - Note: patient data is in the patients table, but email is in users table
(11, 'sokha.chann95@gmail.com', 'Sokha', 'Chann', 'patient123', 'MALE', 3),
(12, 'sreyleak.kim88@gmail.com', 'Sreyleak', 'Kim', 'patient123', 'FEMALE', 3),
(13, 'vuthy.tep90@gmail.com', 'Vuthy', 'Tep', 'patient123', 'MALE', 3),
(14, 'maly.sey92@gmail.com', 'Maly', 'Sey', 'patient123', 'FEMALE', 3),
(15, 'chanra.sorn93@gmail.com', 'Chanra', 'Sorn', 'patient123', 'MALE', 3),
(16, 'lyna.phoeun85@gmail.com', 'Lyna', 'Phoeun', 'patient123', 'FEMALE', 3),
(17, 'narin.oeun89@gmail.com', 'Narin', 'Oeun', 'patient123', 'MALE', 3),
(18, 'sophal.seang91@gmail.com', 'Sophal', 'Seang', 'patient123', 'FEMALE', 3),
(19, 'visal.phan94@gmail.com', 'Visal', 'Phan', 'patient123', 'MALE', 3),
(20, 'dalis.sok96@gmail.com', 'Dalis', 'Sok', 'patient123', 'FEMALE', 3),
-- Receptionist (role_id = 4)
(21, 'receptionist@hospital.com', 'Reception', 'Staff', 'reception123', 'FEMALE', 4)
ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    password = EXCLUDED.password,
    gender = EXCLUDED.gender,
    role_id = EXCLUDED.role_id;

-- Insert doctors data
INSERT INTO doctors (id, first_name, last_name, email, password, contact_number, date_of_birth, gender, city, country, specialization, blood_group, user_id, doctor_id, created_at, updated_at) VALUES
(1, 'Sophia', 'Chen', 'sophia.chen@example.com', 'doctor123', '0987654321', '1990-04-21', 'FEMALE', 'Phnom Penh', 'Cambodia', 'Cardiology', 'B+', 2, 1, NOW(), NOW()),
(2, 'Dara', 'Sok', 'dara.sok@example.com', 'doctor123', '0912345678', '1985-02-15', 'MALE', 'Siem Reap', 'Cambodia', 'Neurology', 'A+', 3, 2, NOW(), NOW()),
(3, 'Vichea', 'Meas', 'vichea.meas@example.com', 'doctor123', '0923456789', '1992-08-12', 'MALE', 'Battambang', 'Cambodia', 'Orthopedics', 'O+', 4, 3, NOW(), NOW()),
(4, 'Sreyneang', 'Khim', 'sreyneang.khim@example.com', 'doctor123', '0934567890', '1995-05-10', 'FEMALE', 'Kampong Cham', 'Cambodia', 'Pediatrics', 'AB+', 5, 4, NOW(), NOW()),
(5, 'Sophal', 'Rith', 'sophal.rith@example.com', 'doctor123', '0945678901', '1988-12-01', 'MALE', 'Takeo', 'Cambodia', 'Dermatology', 'B-', 6, 5, NOW(), NOW()),
(6, 'Dalis', 'Srean', 'dalis.srean@example.com', 'doctor123', '0956789012', '1993-07-30', 'FEMALE', 'Kampot', 'Cambodia', 'Gynecology', 'A-', 7, 6, NOW(), NOW()),
(7, 'Rina', 'Chhay', 'rina.chhay@example.com', 'doctor123', '0967890123', '1991-09-14', 'FEMALE', 'Kandal', 'Cambodia', 'Psychiatry', 'O-', 8, 7, NOW(), NOW()),
(8, 'Piseth', 'Vann', 'piseth.vann@example.com', 'doctor123', '0978901234', '1987-11-11', 'MALE', 'Prey Veng', 'Cambodia', 'ENT', 'AB-', 9, 8, NOW(), NOW()),
(9, 'Chanra', 'Long', 'chanra.long@example.com', 'doctor123', '0989012345', '1996-06-19', 'MALE', 'Svay Rieng', 'Cambodia', 'Ophthalmology', 'A+', 10, 9, NOW(), NOW()),
(10, 'Chenda', 'Keo', 'chenda.keo@example.com', 'doctor123', '0990123456', '1994-03-03', 'FEMALE', 'Kampong Thom', 'Cambodia', 'Radiology', 'B+', 11, 10, NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET 
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    email = EXCLUDED.email,
    password = EXCLUDED.password,
    contact_number = EXCLUDED.contact_number,
    date_of_birth = EXCLUDED.date_of_birth,
    gender = EXCLUDED.gender,
    city = EXCLUDED.city,
    country = EXCLUDED.country,
    specialization = EXCLUDED.specialization,
    blood_group = EXCLUDED.blood_group,
    user_id = EXCLUDED.user_id,
    doctor_id = EXCLUDED.doctor_id,
    updated_at = NOW();

-- Insert patients data
-- Note: Email is stored in the users table, not in the patients table
INSERT INTO patients (patient_id, first_name, last_name, contact_number, date_of_birth, gender, city, country, blood_group, allergies, status, user_id, created_at, updated_at) VALUES
(1, 'Sokha', 'Chann', '0972001111', '1995-04-21', 'MALE', 'Phnom Penh', 'Cambodia', 'O+', 'Peanuts, Penicillin', 'NEW', 11, NOW(), NOW()),
(2, 'Sreyleak', 'Kim', '0972002222', '1988-07-19', 'FEMALE', 'Battambang', 'Cambodia', 'A+', 'Seafood', 'NEW', 12, NOW(), NOW()),
(3, 'Vuthy', 'Tep', '0972003333', '1990-10-11', 'MALE', 'Siem Reap', 'Cambodia', 'B+', 'None', 'NEW', 13, NOW(), NOW()),
(4, 'Maly', 'Sey', '0972004444', '1992-03-09', 'FEMALE', 'Kampong Cham', 'Cambodia', 'O-', 'Dust', 'NEW', 14, NOW(), NOW()),
(5, 'Chanra', 'Sorn', '0972005555', '1993-12-05', 'MALE', 'Takeo', 'Cambodia', 'AB+', 'Latex', 'NEW', 15, NOW(), NOW()),
(6, 'Lyna', 'Phoeun', '0972006666', '1985-09-13', 'FEMALE', 'Kampot', 'Cambodia', 'B-', 'None', 'NEW', 16, NOW(), NOW()),
(7, 'Narin', 'Oeun', '0972007777', '1989-01-20', 'MALE', 'Kandal', 'Cambodia', 'A-', 'Gluten', 'NEW', 17, NOW(), NOW()),
(8, 'Sophal', 'Seang', '0972008888', '1991-05-30', 'FEMALE', 'Prey Veng', 'Cambodia', 'O+', 'Pollen', 'NEW', 18, NOW(), NOW()),
(9, 'Visal', 'Phan', '0972009999', '1994-06-17', 'MALE', 'Svay Rieng', 'Cambodia', 'B+', 'None', 'NEW', 19, NOW(), NOW()),
(10, 'Dalis', 'Sok', '0972010000', '1996-02-27', 'FEMALE', 'Kampong Thom', 'Cambodia', 'AB-', 'Peanuts', 'NEW', 20, NOW(), NOW())
ON CONFLICT (patient_id) DO UPDATE SET 
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    contact_number = EXCLUDED.contact_number,
    date_of_birth = EXCLUDED.date_of_birth,
    gender = EXCLUDED.gender,
    city = EXCLUDED.city,
    country = EXCLUDED.country,
    blood_group = EXCLUDED.blood_group,
    allergies = EXCLUDED.allergies,
    status = EXCLUDED.status,
    user_id = EXCLUDED.user_id,
    updated_at = NOW();

-- Insert appointments data
-- Make sure doctor_id and patient_id references exist
INSERT INTO appointments (appt_id, scheduled_on, doctor_id, patient_id) VALUES
(1, '2025-07-28T09:00:00', 1, 1),
(2, '2025-07-28T09:30:00', 2, 2),
(3, '2025-07-28T10:00:00', 3, 3),
(4, '2025-07-28T10:30:00', 4, 4),
(5, '2025-07-28T11:00:00', 5, 5),
(6, '2025-07-28T11:30:00', 6, 6),
(7, '2025-07-28T12:00:00', 7, 7),
(8, '2025-07-28T12:30:00', 8, 8),
(9, '2025-07-28T13:00:00', 9, 9),
(10, '2025-07-28T13:30:00', 10, 10)
ON CONFLICT (appt_id) DO UPDATE SET 
    scheduled_on = EXCLUDED.scheduled_on,
    doctor_id = EXCLUDED.doctor_id,
    patient_id = EXCLUDED.patient_id;

-- Reset sequences to avoid conflicts
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('patients_patient_id_seq', (SELECT MAX(patient_id) FROM patients));
SELECT setval('doctors_id_seq', (SELECT MAX(id) FROM doctors));
SELECT setval('appointments_appt_id_seq', (SELECT MAX(appt_id) FROM appointments));

-- Test credentials for login:
-- Admin: admin@hospital.com / admin123
-- Doctor: sophia.chen@example.com / doctor123
-- Patient: sokha.chann95@gmail.com / patient123
-- Receptionist: receptionist@hospital.com / reception123
