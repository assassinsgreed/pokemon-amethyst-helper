import { Pokemon } from "@/models/pokemon";
import { initializeApp, cert, getApps, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

class FirebaseService {
    private firestore: Firestore;

    constructor() {
        let app: App;
        const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
        if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
            throw new Error("Missing Firebase Admin credentials in environment variables.");
        }
        
        if (getApps().length === 0) {
            app = initializeApp({
                credential: cert({
                    projectId: FIREBASE_PROJECT_ID,
                    clientEmail: FIREBASE_CLIENT_EMAIL,
                    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
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
        const pokemonCollection = await db.collection("pokemon").get();
        const pokemonList: Pokemon[] = pokemonCollection.docs.map(doc => doc.data() as Pokemon);
        return pokemonList;
    }
}

export const firebaseService = new FirebaseService();