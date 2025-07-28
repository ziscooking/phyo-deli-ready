import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot
} from 'firebase/firestore';
import {
  getAuth,
  signInAnonymously
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyClfejW0YHd8bF3jV_L-TjNgkyXxomEuPU",
  authDomain: "phyo-deli-backend.firebaseapp.com",
  projectId: "phyo-deli-backend",
  storageBucket: "phyo-deli-backend.appspot.com",
  messagingSenderId: "68881654411",
  appId: "1:68881654411:web:65b1c3981b9d980c1f2a8e"
};

const mockStores = [
  {
    id: 'store1',
    name: 'Golden Eats',
    category: 'Burgers & Wraps',
    image: 'https://source.unsplash.com/400x300/?burger'
  },
  {
    id: 'store2',
    name: 'Green Garden',
    category: 'Salads & Healthy',
    image: 'https://source.unsplash.com/400x300/?salad'
  }
];

const App = () => {
  const [stores, setStores] = useState(mockStores);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    signInAnonymously(auth)
      .then(() => {
        const storesRef = collection(db, 'stores');
        onSnapshot(storesRef, (snapshot) => {
          const storeList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setStores(storeList.length > 0 ? storeList : mockStores);
        });
      })
      .catch((error) => {
        console.error('Firebase auth error:', error);
        setStores(mockStores);
      });
  }, []);

  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-4">Phyo Deli 🛵</h1>
      <p className="mb-4">Choose your favorite store:</p>
      <div className="flex flex-wrap gap-4">
        {stores.map(store => (
          <div key={store.id} className="border p-4 w-64 rounded shadow">
            <img src={store.image} alt={store.name} className="w-full h-40 object-cover rounded" />
            <h3 className="text-xl mt-2 font-semibold">{store.name}</h3>
            <p className="text-gray-600">{store.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
