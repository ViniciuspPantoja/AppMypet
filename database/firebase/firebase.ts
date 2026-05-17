import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyA-MFvGiVDUbviz2SGVCLQU131D3zAufFM",
    authDomain: "mypetzone-3ff92.firebaseapp.com",
    projectId: "mypetzone-3ff92",
    storageBucket: "mypetzone-3ff92.firebasestorage.app",
    messagingSenderId: "1025314837737",
    appId: "1:1025314837737:web:3d84059d1c22a103fbcc78",
    measurementId: "G-C6XMLGEWG2"
};

const isConfigured = Object.values(firebaseConfig).every(Boolean);

function createFirebaseApp(): FirebaseApp {
	if (!isConfigured) {
		throw new Error(
			'Firebase não configurado. Defina as variáveis EXPO_PUBLIC_FIREBASE_* antes de usar a conexão.',
		);
	}

	return getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
}

export function getFirebaseApp(): FirebaseApp {
	return createFirebaseApp();
}

export function getFirebaseAuth() {
	return getAuth(createFirebaseApp());
}

export function getFirestoreDb() {
	return getFirestore(createFirebaseApp());
}


const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp()

/**
 * Instâncias compartilhadas
 */
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app

export { firebaseConfig, isConfigured };