-- Job Application Portal: PostgreSQL schema and seed data
-- Run with:  psql -d your_database -f schema.sql

BEGIN;

-- ---------- types ----------
CREATE TYPE job_type          AS ENUM ('Full-time', 'Part-time', 'Contract', 'Internship');
CREATE TYPE job_level         AS ENUM ('Entry', 'Mid', 'Senior');
CREATE TYPE work_mode         AS ENUM ('On-site', 'Hybrid', 'Remote');
CREATE TYPE application_status AS ENUM ('submitted', 'review', 'interview', 'offer', 'rejected');

-- ---------- tables ----------
CREATE TABLE companies (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE jobs (
  id           BIGSERIAL PRIMARY KEY,
  company_id   BIGINT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  city         TEXT NOT NULL,                 -- 'Remote' for remote roles
  area         TEXT NOT NULL,
  type         job_type NOT NULL,
  level        job_level NOT NULL,
  category     TEXT NOT NULL,
  mode         work_mode NOT NULL,
  salary_min   INTEGER NOT NULL CHECK (salary_min >= 0),   -- KES per month
  salary_max   INTEGER NOT NULL CHECK (salary_max >= salary_min),
  summary      TEXT NOT NULL,
  duties       TEXT[] NOT NULL DEFAULT '{}',
  requirements TEXT[] NOT NULL DEFAULT '{}',
  perks        TEXT[] NOT NULL DEFAULT '{}',
  skills       TEXT[] NOT NULL DEFAULT '{}',
  posted_at    DATE NOT NULL DEFAULT CURRENT_DATE,
  closes_at    DATE NOT NULL,
  is_active    BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX jobs_open_idx     ON jobs (is_active, closes_at);
CREATE INDEX jobs_city_idx     ON jobs (city);
CREATE INDEX jobs_category_idx ON jobs (category);
CREATE INDEX jobs_search_idx   ON jobs USING GIN (
  to_tsvector('simple', title || ' ' || category || ' ' || city || ' ' || area || ' ' || array_to_string(skills, ' '))
);

CREATE TABLE applicants (
  id          BIGSERIAL PRIMARY KEY,
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE,
  phone       TEXT NOT NULL,
  city        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE SEQUENCE application_ref_seq START 1;

CREATE TABLE applications (
  id                   BIGSERIAL PRIMARY KEY,
  reference            TEXT NOT NULL UNIQUE
                         DEFAULT ('APP-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('application_ref_seq')::text, 4, '0')),
  job_id               BIGINT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_id         BIGINT NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
  current_role         TEXT NOT NULL,
  years_experience     TEXT NOT NULL,
  expected_salary_kes  INTEGER CHECK (expected_salary_kes IS NULL OR expected_salary_kes >= 0),
  notice_period        TEXT NOT NULL DEFAULT 'Available immediately',
  cv_file_name         TEXT NOT NULL,
  cv_file_path         TEXT NOT NULL,         -- location in your file storage (disk or bucket)
  cover_letter         TEXT CHECK (cover_letter IS NULL OR char_length(cover_letter) <= 1200),
  link_url             TEXT,
  status               application_status NOT NULL DEFAULT 'submitted',
  applied_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (job_id, applicant_id)               -- one application per person per job
);

CREATE INDEX applications_job_idx       ON applications (job_id, status);
CREATE INDEX applications_applicant_idx ON applications (applicant_id);

CREATE TABLE application_status_history (
  id             BIGSERIAL PRIMARY KEY,
  application_id BIGINT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  status         application_status NOT NULL,
  changed_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE saved_jobs (
  applicant_id BIGINT NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
  job_id       BIGINT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  saved_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (applicant_id, job_id)
);

-- ---------- triggers: keep updated_at fresh and log every status change ----------
CREATE FUNCTION applications_track_status() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO application_status_history (application_id, status) VALUES (NEW.id, NEW.status);
  ELSIF NEW.status IS DISTINCT FROM OLD.status THEN
    NEW.updated_at := now();
    INSERT INTO application_status_history (application_id, status) VALUES (NEW.id, NEW.status);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER applications_status_update
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION applications_track_status();

CREATE TRIGGER applications_status_insert
  AFTER INSERT ON applications
  FOR EACH ROW EXECUTE FUNCTION applications_track_status();

-- ---------- views ----------
CREATE VIEW open_jobs AS
SELECT j.*, c.name AS company
FROM jobs j
JOIN companies c ON c.id = j.company_id
WHERE j.is_active AND j.closes_at >= CURRENT_DATE;

CREATE VIEW application_overview AS
SELECT a.reference, a.status, a.applied_at, a.updated_at,
       j.title AS job_title, c.name AS company,
       p.full_name, p.email, p.phone, p.city,
       a.current_role, a.years_experience, a.expected_salary_kes, a.cv_file_name
FROM applications a
JOIN jobs j       ON j.id = a.job_id
JOIN companies c  ON c.id = j.company_id
JOIN applicants p ON p.id = a.applicant_id;

-- ---------- seed data: the 13 roles shown in the portal ----------
INSERT INTO companies (name) VALUES
  ('Savanna Fintech'), ('Lakeshore Health Partners'), ('Baobab Coast Hotels'),
  ('Rift Freight and Cold Chain'), ('Kilimani Analytics'), ('Highland Schools Trust');

INSERT INTO jobs (company_id, title, city, area, type, level, category, mode, salary_min, salary_max, summary, duties, requirements, perks, skills, posted_at, closes_at) VALUES
((SELECT id FROM companies WHERE name='Savanna Fintech'), 'Senior Backend Engineer', 'Nairobi', 'Westlands', 'Full-time', 'Senior', 'Technology', 'Hybrid', 380000, 520000,
 'Build and run the payment services behind a merchant wallet used across East Africa. You will own reliability from design through on-call.',
 ARRAY['Design and ship services that process mobile money and card transactions','Review code and mentor two mid-level engineers','Improve latency and uptime on the settlement pipeline','Join a weekly on-call rotation with a recovery day after each shift'],
 ARRAY['6 or more years building backend systems in production','Strong SQL and experience with message queues','Clear written English for design documents','Experience with ledgers or payments is a plus'],
 ARRAY['Medical cover for you and four dependants','KES 120,000 yearly learning budget','Two remote days each week'],
 ARRAY['Python','PostgreSQL','APIs','Payments'], CURRENT_DATE - 2, CURRENT_DATE + 21),

((SELECT id FROM companies WHERE name='Savanna Fintech'), 'Customer Support Associate', 'Nairobi', 'CBD', 'Full-time', 'Entry', 'Customer Service', 'On-site', 55000, 75000,
 'Help merchants and shoppers solve payment problems over chat and phone. You will be the first person customers hear from when something goes wrong.',
 ARRAY['Resolve customer tickets within the agreed response time','Escalate failed-payment cases to the operations team with full notes','Update the help centre when you spot a recurring question','Work one weekend shift in four'],
 ARRAY['Diploma or certificate in any field','Fluent Swahili and English, spoken and written','Calm manner with upset customers','No prior support experience needed, training is paid'],
 ARRAY['Two weeks of paid training','Medical cover','Transport allowance'],
 ARRAY['Swahili','English','Empathy','Ticketing'], CURRENT_DATE - 1, CURRENT_DATE + 12),

((SELECT id FROM companies WHERE name='Lakeshore Health Partners'), 'Registered Nurse, Outpatient', 'Kisumu', 'Milimani', 'Full-time', 'Mid', 'Healthcare', 'On-site', 90000, 130000,
 'Run the outpatient clinic floor with a small team of clinical officers and nurses, from triage to follow-up visits.',
 ARRAY['Triage walk-in patients and prepare them for consultation','Administer treatments and vaccinations under clinic protocols','Keep accurate patient records','Counsel patients on follow-up care'],
 ARRAY['Diploma or degree in nursing','Valid Nursing Council of Kenya licence','2 or more years in a clinic or hospital','Comfortable working a rotating weekday schedule'],
 ARRAY['Medical cover','Annual licence renewal paid','Housing allowance'],
 ARRAY['Triage','Patient care','Records','NCK licence'], CURRENT_DATE - 5, CURRENT_DATE + 16),

((SELECT id FROM companies WHERE name='Baobab Coast Hotels'), 'Front Office Supervisor', 'Mombasa', 'Nyali', 'Full-time', 'Mid', 'Hospitality', 'On-site', 70000, 95000,
 'Lead the reception, concierge and bell teams at a 120-room beachfront hotel through busy holiday seasons.',
 ARRAY['Plan daily shifts for a team of eight','Handle VIP arrivals and guest complaints','Reconcile the front desk ledger at close of shift','Train new receptionists on the booking system'],
 ARRAY['3 or more years in a hotel front office','Diploma in hospitality or similar','Confident with property management software','Willing to work weekends and public holidays'],
 ARRAY['Staff meals on duty','Service charge share','Free shuttle from town'],
 ARRAY['Guest relations','Reservations','Team lead','Shift planning'], CURRENT_DATE - 3, CURRENT_DATE + 9),

((SELECT id FROM companies WHERE name='Rift Freight and Cold Chain'), 'Logistics Coordinator', 'Nakuru', 'Industrial Area', 'Full-time', 'Mid', 'Logistics', 'On-site', 85000, 115000,
 'Keep refrigerated trucks moving on time between Nakuru, Nairobi and the coast, and keep customers informed at every stop.',
 ARRAY['Assign drivers and vehicles to daily routes','Track temperatures and delivery windows','Resolve delays with customers before they escalate','Report weekly on-time delivery figures'],
 ARRAY['Diploma in supply chain or logistics','2 or more years in dispatch or fleet operations','Good Excel skills','Clear phone manner'],
 ARRAY['Medical cover','Performance bonus each quarter','Pension scheme'],
 ARRAY['Dispatch','Route planning','Excel','Cold chain'], CURRENT_DATE - 6, CURRENT_DATE + 24),

((SELECT id FROM companies WHERE name='Kilimani Analytics'), 'Data Analyst', 'Remote', 'Kenya', 'Contract', 'Mid', 'Technology', 'Remote', 200000, 260000,
 'Six-month contract to build reporting for a retail client with 40 shops. You will turn till data into weekly decisions for store managers.',
 ARRAY['Clean and combine sales and stock data from several systems','Build a weekly dashboard for store managers','Run simple forecasts for fast-moving products','Present findings to the client every Friday'],
 ARRAY['3 or more years analysing business data','Strong SQL, working knowledge of Python or R','Experience with a dashboard tool','Reliable internet and availability during Nairobi working hours'],
 ARRAY['Fully remote','Possible extension after six months','Monthly invoicing, paid within 14 days'],
 ARRAY['SQL','Dashboards','Statistics','Python'], CURRENT_DATE - 4, CURRENT_DATE + 14),

((SELECT id FROM companies WHERE name='Highland Schools Trust'), 'Accountant', 'Nyeri', 'Town', 'Full-time', 'Mid', 'Finance', 'On-site', 80000, 110000,
 'Manage the books for four schools: fee collection, payroll, supplier payments and termly budgets.',
 ARRAY['Reconcile fee payments and follow up balances with parents','Run monthly payroll for about 150 staff','Prepare termly budgets with each head teacher','Support the annual audit'],
 ARRAY['CPA (K) section 4 or higher','3 or more years of accounting experience','Experience with accounting software','Integrity and attention to detail'],
 ARRAY['Medical cover','School fee discount for dependants','Retirement benefits'],
 ARRAY['CPA','Fee collection','Payroll','Budgeting'], CURRENT_DATE - 8, CURRENT_DATE + 19),

((SELECT id FROM companies WHERE name='Kilimani Analytics'), 'Marketing Intern', 'Nairobi', 'Kilimani', 'Internship', 'Entry', 'Marketing', 'On-site', 25000, 25000,
 'A three-month internship supporting the marketing lead with content, newsletters and event follow-up.',
 ARRAY['Draft social posts and a monthly newsletter','Research competitors and summarise findings','Help organise two client events','Track campaign results in a shared sheet'],
 ARRAY['Recent graduate or final-year student in marketing, communications or similar','Strong writing in English','Comfortable learning new tools quickly','Available 5 days a week for three months'],
 ARRAY['Monthly stipend and lunch allowance','Mentor from the marketing team','Reference letter on completion'],
 ARRAY['Social media','Writing','Canva','Research'], CURRENT_DATE - 1, CURRENT_DATE + 28),

((SELECT id FROM companies WHERE name='Highland Schools Trust'), 'Mathematics and Physics Teacher', 'Eldoret', 'Town', 'Full-time', 'Mid', 'Education', 'On-site', 60000, 85000,
 'Teach Forms 1 to 4 at a day and boarding secondary school with strong KCSE results and a growing science club.',
 ARRAY['Teach 24 lessons a week across Forms 1 to 4','Prepare students for KCSE examinations','Run the science club once a week','Mark and report progress each term'],
 ARRAY['Bachelor of Education in Mathematics and Physics','TSC registration','2 or more years of classroom experience','Willingness to join boarding duty in rotation'],
 ARRAY['On-campus housing option','Medical cover','Paid professional development days'],
 ARRAY['KCSE','Lesson planning','Mentoring','TSC'], CURRENT_DATE - 9, CURRENT_DATE + 30),

((SELECT id FROM companies WHERE name='Rift Freight and Cold Chain'), 'Warehouse Associate', 'Nakuru', 'Industrial Area', 'Part-time', 'Entry', 'Logistics', 'On-site', 30000, 40000,
 'Part-time shifts loading and unloading trucks and counting stock in a temperature-controlled warehouse.',
 ARRAY['Load and unload pallets safely','Scan stock in and out of the system','Help with weekly stock counts','Follow cold room safety rules'],
 ARRAY['KCSE certificate','Able to lift 20 kg repeatedly','Forklift licence is a plus','Available for four shifts a week including one weekend day'],
 ARRAY['Thermal work gear provided','Overtime paid at 1.5 times','Path to full-time roles'],
 ARRAY['Loading','Stock counts','Forklift','Safety'], CURRENT_DATE - 2, CURRENT_DATE + 10),

((SELECT id FROM companies WHERE name='Savanna Fintech'), 'Product Designer', 'Remote', 'Kenya', 'Full-time', 'Mid', 'Technology', 'Remote', 220000, 300000,
 'Design the merchant app used by small shop owners on low-cost Android phones, from research to shipped screens.',
 ARRAY['Interview shop owners and turn findings into designs','Design and prototype mobile flows in Figma','Work with engineers through build and release','Maintain the shared component library'],
 ARRAY['3 or more years designing mobile products','A portfolio with shipped work','Experience designing for low-end devices','Clear written and spoken English'],
 ARRAY['Remote with two team meetups a year','Equipment allowance','Medical cover'],
 ARRAY['Figma','Research','Mobile UI','Prototyping'], CURRENT_DATE - 7, CURRENT_DATE + 20),

((SELECT id FROM companies WHERE name='Baobab Coast Hotels'), 'Head Chef', 'Diani', 'Beach Road', 'Full-time', 'Senior', 'Hospitality', 'On-site', 150000, 210000,
 'Lead a kitchen of 14 serving three restaurants and banquets, with a menu built around fresh coastal produce.',
 ARRAY['Design seasonal menus and control food cost','Manage rosters, ordering and supplier relationships','Keep the kitchen to HACCP standards','Train and develop sous chefs'],
 ARRAY['8 or more years in professional kitchens, 3 as head or sous chef','Strong seafood and Swahili coast cooking','Proven food cost control','Culinary diploma preferred'],
 ARRAY['Live-in accommodation option','Service charge share','Staff meals'],
 ARRAY['Menu design','Seafood','Kitchen management','Food safety'], CURRENT_DATE - 11, CURRENT_DATE + 17),

((SELECT id FROM companies WHERE name='Savanna Fintech'), 'Security Operations Analyst', 'Nairobi', 'Westlands', 'Full-time', 'Mid', 'Technology', 'Hybrid', 250000, 340000,
 'Watch, triage and investigate security alerts across a payments platform, and help the team get faster at containing incidents.',
 ARRAY['Monitor alerts in the SIEM and triage by severity','Investigate suspicious activity and write incident reports','Tune detection rules to cut false alarms','Run quarterly phishing exercises'],
 ARRAY['2 or more years in a security operations or IT security role','Working knowledge of networking and common attack techniques','Experience reading logs','A security certification is a plus'],
 ARRAY['Certification exam fees paid','Medical cover','Rotating shift allowance'],
 ARRAY['SIEM','Incident response','Log analysis','Networking'], CURRENT_DATE - 3, CURRENT_DATE + 23);

COMMIT;

-- ---------- queries the portal will need ----------
-- Browse open roles, newest first:
--   SELECT * FROM open_jobs ORDER BY posted_at DESC;
--
-- Search by keyword, city and category:
--   SELECT * FROM open_jobs
--   WHERE to_tsvector('simple', title || ' ' || category || ' ' || city || ' ' || area || ' ' || array_to_string(skills, ' '))
--         @@ plainto_tsquery('simple', 'nurse')
--     AND city = 'Kisumu' AND category = 'Healthcare';
--
-- Create or update an applicant, then apply:
--   INSERT INTO applicants (full_name, email, phone, city)
--   VALUES ('Jane Wanjiru', 'jane@example.com', '0712345678', 'Nakuru')
--   ON CONFLICT (email) DO UPDATE SET full_name = EXCLUDED.full_name, phone = EXCLUDED.phone, city = EXCLUDED.city
--   RETURNING id;
--
--   INSERT INTO applications (job_id, applicant_id, current_role, years_experience, expected_salary_kes, cv_file_name, cv_file_path)
--   VALUES (5, 1, 'Dispatch clerk', '3 to 5 years', 100000, 'jane-cv.pdf', 'cvs/2026/jane-cv.pdf')
--   RETURNING reference;
--
-- Everything one applicant has applied for:
--   SELECT * FROM application_overview WHERE email = 'jane@example.com' ORDER BY applied_at DESC;
--
-- Move an application forward (the trigger logs it in application_status_history):
--   UPDATE applications SET status = 'interview' WHERE reference = 'APP-2026-0001';
