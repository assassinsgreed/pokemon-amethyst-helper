// importPokemon.js

const admin = require('firebase-admin');
const fs = require('fs');

// --- Configuration ---
// Replace 'path/to/your/pokemon_data.json' with the actual path to your JSON file
const dataFilePath = './pokemon_data.json';
const collectionName = 'pokemon'; // The Firestore collection you want to import into
const projectId = 'pokemon-amethyst-helper'; // Your project ID

// --- Initialize Firebase Admin SDK ---
// The SDK will automatically look for the GOOGLE_APPLICATION_CREDENTIALS environment variable.
// If you prefer to specify the key file path directly, uncomment the lines below
// and replace 'path/to/your/service-account-file.json' with the correct path.
try {
  admin.initializeApp({
    projectId: projectId,
    credential: admin.credential.cert('./pokemon-amethyst-helper-firebase-adminsdk-fbsvc-5f5d94782b.json')
  });
  console.log('Firebase Admin SDK initialized successfully.');
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
  console.error('Please ensure GOOGLE_APPLICATION_CREDENTIALS is set or credential path is correct.');
  process.exit(1); // Exit if initialization fails
}


const db = admin.firestore();

async function importData() {
  let data;
  try {
    // Read the JSON file
    const rawData = fs.readFileSync(dataFilePath);
    // Parse the JSON data. Assuming the file contains an array of objects.
    data = JSON.parse(rawData.toString());
    console.log(`Successfully read and parsed data from ${dataFilePath}. Found ${data.length} items.`);

    if (!Array.isArray(data)) {
        console.error('Error: The JSON file does not contain an array of objects.');
        process.exit(1);
    }

  } catch (error) {
    console.error(`Error reading or parsing file ${dataFilePath}:`, error);
    process.exit(1); // Exit if file reading or parsing fails
  }

  // Firestore allows a maximum of 500 operations per batch write.
  const batchSize = 500;
  let batch = db.batch();
  let batchCount = 0; // Counter for operations in the current batch
  let totalOperations = 0; // Counter for total operations across all batches

  console.log(`Starting import into collection: "${collectionName}"`);
  console.log(`Processing data in batches of ${batchSize}...`);

  for (const item of data) {
    // *** IMPORTANT: Determine the Document ID ***
    // This example assumes each item in your JSON has a unique 'id' field
    // that you want to use as the Firestore document ID.
    // If your JSON structure is different, or you want Firestore to generate IDs,
    // modify the line below:
    // - If your unique identifier field is named differently (e.g., 'pokemonId'), use item.pokemonId
    // - If you want Firestore to auto-generate an ID, use db.collection(collectionName).doc()
    //   like this: const docRef = db.collection(collectionName).doc(); batch.set(docRef, item);
    // - Be careful if your data might have duplicate IDs!

    if (item.id === undefined) {
        console.warn('Skipping item - missing required "id" field:', item);
        continue; // Skip this item if it doesn't have an ID field
    }

    const docRef = db.collection(collectionName).doc(String(item.id)); // Use String(item.id) to ensure it's a string ID
    batch.set(docRef, item); // Use .set() to create or overwrite the document

    batchCount++;
    totalOperations++;

    // If the current batch is full (500 operations) or we're at the last item, commit the batch
    if (batchCount === batchSize || totalOperations === data.length) {
      try {
        console.log(`Committing batch with ${batchCount} operations... (Total committed so far: ${totalOperations - batchCount + batchCount})`);
        await batch.commit();
        console.log('Batch committed successfully.');

        // Start a new batch for the next set of operations, unless we just committed the last batch
        if (totalOperations < data.length) {
          batch = db.batch();
          batchCount = 0;
        }

      } catch (batchError) {
        console.error('Error committing batch:', batchError);
        // Depending on your needs, you might want to stop here or try to continue
        // For simplicity, this example logs the error and continues
      }
    }
  }

  console.log(`Import process finished. Attempted to process ${data.length} items.`);
  console.log(`Total documents potentially written: ${totalOperations}`);
}

// Run the import process
importData().then(() => {
  console.log('Bulk import script completed.');
  process.exit(0); // Exit successfully
}).catch((error) => {
  console.error('An error occurred during the import process:', error);
  process.exit(1); // Exit with an error code
});
