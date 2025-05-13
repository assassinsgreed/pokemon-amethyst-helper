import { Pokemon } from "@/models/pokemon";
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore, collection, getDocs } from "firebase/firestore";

class FirebaseService {
    private firestore: Firestore;

    constructor() {
        const firebaseConfig = {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
            measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
        };

        const app = initializeApp(firebaseConfig);
        this.firestore = getFirestore(app);
    }

    public getFirestoreInstance(): Firestore {
        return this.firestore;
    }

    public async getPokemon(): Promise<Pokemon[]> {
        const db = this.getFirestoreInstance();
        const pokemonCollection = await getDocs(collection(db, "pokemon"));
        const pokemonList: Pokemon[] = pokemonCollection.docs.map(doc => doc.data() as Pokemon);
        return pokemonList;
    }
}

export const firebaseService = new FirebaseService();