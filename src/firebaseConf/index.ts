import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyA-FBxt57tgquK4PxZFoliH9OD7YeEaSSs',
	authDomain: 'chat-app-ef221.firebaseapp.com',
	projectId: 'chat-app-ef221',
	storageBucket: 'chat-app-ef221.appspot.com',
	messagingSenderId: '1005522752179',
	appId: '1:1005522752179:web:cd30fe8896765bb57a96c6',
};

export const fireApp = initializeApp(firebaseConfig);
export const auth = getAuth(fireApp);
export const storage = getStorage();
export const db = getFirestore();
