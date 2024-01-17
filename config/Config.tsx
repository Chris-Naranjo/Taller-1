import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

export const firebaseConfig = {
  apiKey: "AIzaSyB7anoBovdSNYNxohsWTYdTqnP5aRGTLvo",
  authDomain: "videojuegos3-886a8.firebaseapp.com",
  projectId: "videojuegos3-886a8",
  storageBucket: "videojuegos3-886a8.appspot.com",
  messagingSenderId: "55315714944",
  appId: "1:55315714944:web:05d0e26a9abfd3d6982765"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app) // base de datos

export const storage = getStorage(app)


export const auth = initializeAuth(app, {
 //persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});