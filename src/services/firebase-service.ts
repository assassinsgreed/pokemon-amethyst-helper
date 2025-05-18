import { Pokemon } from "@/models/pokemon";
import { initializeApp, cert, getApps, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

class FirebaseService {
    private firestore: Firestore;

    constructor() {
        let app: App;
        if (getApps().length === 0) {
            if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
                throw new Error("Missing Firebase Admin credentials in environment variables.");
            }

            app = initializeApp({
                credential: cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
                }),
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
        try {
            const pokemonCollection = await db.collection("pokemon").get();
            const pokemonList: Pokemon[] = pokemonCollection.docs.map(doc => doc.data() as Pokemon);
            return pokemonList;
        } catch (err) {
            console.error("Error fetching Pokemon data:", err);
            throw err;
        }
    }
}

export const firebaseService = new FirebaseService();