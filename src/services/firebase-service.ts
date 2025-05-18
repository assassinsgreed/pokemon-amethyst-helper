import { Pokemon } from "@/models/pokemon";
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, collection, getDocs } from "firebase/firestore";

class FirebaseService {
    private firestore: Firestore;

    constructor() {
        let app: FirebaseApp;
        if (getApps().length === 0) {
            app = initializeApp({
                apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
                authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
                messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
                appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
                measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
            });
        } else {
            app = getApps()[0];
        }
        this.firestore = getFirestore(app);
    }

    public getFirestoreInstance(): Firestore {
        return this.firestore;
    }

    public async getPokemon(): Promise<Pokemon[]> {
        const db = this.getFirestoreInstance();
        const pokemonSnapshot = await getDocs(collection(db, "pokemon"));
        const pokemonList: Pokemon[] = pokemonSnapshot.docs.map(doc => doc.data() as Pokemon);
        return pokemonList;
    }
}

export const firebaseService = new FirebaseService();