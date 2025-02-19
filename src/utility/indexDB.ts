import { openDB, IDBPDatabase } from "idb";
import { DB_NAME, STORE_NAME } from "@/constants";

interface StoreData {
  id?: number;
  name: string;
  createdAt: Date;
}

// Store the database instance
let dbInstance: IDBPDatabase | null = null;

const initDB = async (): Promise<IDBPDatabase> => {
  // If the database is already initialized, return the existing instance
  if (dbInstance) {
    return dbInstance;
  }

  // Initialize the database and store the instance
  dbInstance = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });

  return dbInstance;
};

export const addData = async (data: any): Promise<IDBValidKey> => {
  const db = await initDB();
  return db.put(STORE_NAME, data);
};

export const getData = async (id: number): Promise<StoreData | undefined> => {
  const db = await initDB();
  return db.get(STORE_NAME, id);
};

export const getAllData = async (): Promise<StoreData[]> => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const deleteData = async (id: number): Promise<void> => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
