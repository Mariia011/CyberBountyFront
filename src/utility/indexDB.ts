// import { openDB, IDBPDatabase } from "idb";
// import { DB_NAME, STORE_NAME } from "@/constants";

// // Store the database instance
// let dbInstance: IDBPDatabase | null = null;

// const initDB = async (): Promise<IDBPDatabase> => {
//   // If the database is already initialized, return the existing instance
//   if (dbInstance) {
//     return dbInstance;
//   }

//   // Initialize the database and store the instance
//   dbInstance = await openDB(DB_NAME, 1, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains(STORE_NAME)) {
//         db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
//       }
//     },
//   });

//   return dbInstance;
// };

// export const addData = async (data: any): Promise<IDBValidKey> => {
//   const db = await initDB();
//   return db.put(STORE_NAME, data);
// };

// export const getData = async (id: number): Promise<string | undefined> => {
//   const db = await initDB();
//   return db.get(STORE_NAME, id);
// };

// export const deleteData = async (id: number): Promise<void> => {
//   const db = await initDB();
//   await db.delete(STORE_NAME, id);
// };

import { openDB, IDBPDatabase } from "idb";
import { DB_NAME, STORE_NAME } from "@/constants";

// Store the database instance
let dbInstance: IDBPDatabase | null = null;

const initDB = async (): Promise<IDBPDatabase> => {
  // If the database is already initialized, return the existing instance
  if (dbInstance) return dbInstance;

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

/**
 * Add a string to IndexedDB
 */
export const addString = async (value: string): Promise<IDBValidKey> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  
  // Store the string with an auto-incrementing key
  const id = await store.add({ value });

  await tx.done;
  return id;
};

/**
 * Retrieve a string from IndexedDB by ID
 */
export const getString = async (id: number): Promise<string | undefined> => {
  const db = await initDB();
  const record = await db.get(STORE_NAME, id);
  return record?.value; // Extract the string from the stored object
};

/**
 * Delete a string from IndexedDB by ID
 */
export const deleteString = async (id: number): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  
  await store.delete(id);
  await tx.done;
};
