import { DatabaseSync } from "node:sqlite";
import path from "path";

const DB_PATH = path.resolve(process.cwd(), "data/leads.db");

function getDb(): DatabaseSync {
  const db = new DatabaseSync(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads_enterprise (
      reference TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      company TEXT NOT NULL,
      email_domain TEXT NOT NULL,
      nicho_interes TEXT,
      score INTEGER,
      consent_utc TEXT NOT NULL,
      created_utc TEXT NOT NULL
    );
  `);
  return db;
}

export interface LeadRecord {
  reference: string;
  full_name: string;
  company: string;
  email_domain: string;
  nicho_interes: string | null;
  score: number | null;
  consent_utc: string;
  created_utc: string;
}

export function insertLead(
  reference: string,
  fullName: string,
  company: string,
  emailDomain: string,
  nichoInteres: string | null,
  score: number | null
): void {
  const db = getDb();
  const now = new Date().toISOString();
  const stmt = db.prepare(
    `INSERT INTO leads_enterprise (reference, full_name, company, email_domain, nicho_interes, score, consent_utc, created_utc)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  stmt.run(reference, fullName, company, emailDomain, nichoInteres, score ?? null, now, now);
  db.close();
}

export function getLead(reference: string): LeadRecord | null {
  const db = getDb();
  const stmt = db.prepare(`SELECT * FROM leads_enterprise WHERE reference = ?`);
  const row = stmt.get(reference) as LeadRecord | undefined;
  db.close();
  return row ?? null;
}

export function listLeads(): LeadRecord[] {
  const db = getDb();
  const stmt = db.prepare(`SELECT * FROM leads_enterprise ORDER BY created_utc DESC`);
  const rows = stmt.all() as unknown as LeadRecord[];
  db.close();
  return rows;
}
