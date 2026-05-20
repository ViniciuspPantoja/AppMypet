import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "mypet.db";

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!databasePromise) {
    databasePromise = openAndMigrate();
  }
  return databasePromise;
}

async function openAndMigrate(): Promise<SQLite.SQLiteDatabase> {
  const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  await db.execAsync("PRAGMA foreign_keys = ON;");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY NOT NULL,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      account_type TEXT NOT NULL CHECK(account_type IN ('user', 'company')),
      display_name TEXT,
      birth_date TEXT,
      photo_url TEXT,
      cnpj TEXT,
      business_name TEXT,
      business_segment TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS pets (
      id TEXT PRIMARY KEY NOT NULL,
      tutor_uid TEXT NOT NULL,
      name TEXT NOT NULL,
      species TEXT NOT NULL,
      breed TEXT NOT NULL,
      sex TEXT,
      age REAL NOT NULL,
      weight REAL NOT NULL,
      photo_url TEXT,
      registration_date TEXT NOT NULL,
      tutor_name TEXT,
      tutor_email TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (tutor_uid) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS vaccines (
      id TEXT PRIMARY KEY NOT NULL,
      tutor_uid TEXT NOT NULL,
      pet_id TEXT NOT NULL,
      pet_name TEXT,
      name TEXT NOT NULL,
      application_date TEXT NOT NULL,
      next_due TEXT,
      tutor_name TEXT,
      tutor_email TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
      FOREIGN KEY (tutor_uid) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS pet_friendly_stores (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      address TEXT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      created_by_uid TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (created_by_uid) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  return db;
}
