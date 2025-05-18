import { Pokemon } from "@/models/pokemon";
import { initializeApp, cert, getApps, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

class FirebaseService {
    private firestore: Firestore;
    private pokemonCache: Pokemon[] | null = null;
    private cacheTimestamp: number | null = null;
    private readonly CACHE_DURATION_MS = 3 * 60 * 60 * 1000; // 3 hours

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
        const now = Date.now();
        if (this.pokemonCache && this.cacheTimestamp && now - this.cacheTimestamp < this.CACHE_DURATION_MS) {
            return this.pokemonCache;
        }
        const db = this.getFirestoreInstance();
        const pokemonCollection = await db.collection("pokemon").get();
        const pokemonList: Pokemon[] = pokemonCollection.docs.map(doc => doc.data() as Pokemon);
        this.pokemonCache = pokemonList;
        this.cacheTimestamp = now;
        return pokemonList;
    }
}

export const firebaseService = new FirebaseService();