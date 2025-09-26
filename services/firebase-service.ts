import { Pokemon } from "../types/pokemon";
import { Location } from "../types/location";
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

        // Note: Fetching location data like this is poor form because it is only needed when viewing location data in the modal
        // This would require me to refactor a lot of architecture which isn't worth it for a project of this size. 
        const pokemonList: Pokemon[] = await Promise.all(
            pokemonCollection.docs.map(async doc => {
            const data = doc.data();
            const id = doc.id;
            const locations = await this.getLocationData(id);
            return {
                ...data,
                id,
                locations,
            } as Pokemon;
            })
        );
        
        return pokemonList;
    }

    public async getLocationData(pokemonId: string): Promise<Location[]> {
        const db = this.getFirestoreInstance();
        const locationDoc = await db.collection("locations").doc(pokemonId).get();
        if (!locationDoc.exists || !locationDoc.data()) {
            return [];
        }
        return locationDoc.data()!.locations;
    }
}

export const firebaseService = new FirebaseService();