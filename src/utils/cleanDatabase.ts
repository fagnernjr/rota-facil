import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function cleanDatabase() {
  const collections = ['couriers', 'employees', 'deliveries'];
  
  for (const collectionName of collections) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    
    const deletePromises = querySnapshot.docs.map(document => 
      deleteDoc(doc(db, collectionName, document.id))
    );
    
    await Promise.all(deletePromises);
  }
}