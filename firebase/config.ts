import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
    getFirestore,
    DocumentData,
    collection,
    CollectionReference,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { IUser } from '../typings';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD37WH6YqWcrfQ63YCFjlH4PETEgssGko4',
    authDomain: 'netflix-khanh.firebaseapp.com',
    projectId: 'netflix-khanh',
    storageBucket: 'netflix-khanh.appspot.com',
    messagingSenderId: '670226713385',
    appId: '1:670226713385:web:0304f8765c68d6b6084538',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore();

export const storage = getStorage(app);

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(db, collectionName) as CollectionReference<T>;
};

// export all your collections
export const usersCol = createCollection<IUser>('users');
