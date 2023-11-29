
import { openDB } from 'idb';


const jateDB = "jate"

const initdb = async () =>
  openDB(jateDB, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(jateDB)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(jateDB, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {

  const contentDB = await openDB(jateDB, 1);

  const tx = contentDB.transaction(jateDB, 'readwrite');

  const store = tx.objectStore(jateDB);

  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};


export const getDb = async () => {

  const contentDB = await openDB(jateDB, 1);
  const tx = contentDB.transaction(jateDB, 'readonly');
  const store = tx.objectStore(jateDB);


  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
