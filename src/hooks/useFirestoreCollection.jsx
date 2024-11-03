import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const useFirestoreCollection = (collectionName) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Referencia a la colección
    const collectionRef = collection(db, collectionName);
    
    // Escuchar cambios en tiempo real
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(items);
    });

    // Limpiar la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, [collectionName]);

  return data;
};

export default useFirestoreCollection;
