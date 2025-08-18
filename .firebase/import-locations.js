// importLocations.js

const admin = require('firebase-admin');
const fs = require('fs');

// --- Configuration ---
// Replace 'path/to/your/location_data.json' with the actual path to your JSON file
const dataFilePath = './location_data.json';
const collectionName = 'locations'; // The Firestore collection you want to import into
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
    // Parse the JSON data. Now expecting an object with keys as IDs and values as arrays
    data = JSON.parse(rawData.toString());
    const keys = Object.keys(data);
    console.log(`Successfully read and parsed data from ${dataFilePath}. Found ${keys.length} keys.`);
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

  const keys = Object.keys(data);
  for (const key of keys) {
    const value = data[key]; // This is the array for this Pokémon
    const docRef = db.collection(collectionName).doc(String(key));
    batch.set(docRef, { locations: value }); // Store the array under a 'locations' field

    batchCount++;
    totalOperations++;

    // If the current batch is full (500 operations) or we're at the last item, commit the batch
    if (batchCount === batchSize || totalOperations === keys.length) {
      try {
        console.log(`Committing batch with ${batchCount} operations... (Total committed so far: ${totalOperations})`);
        await batch.commit();
        console.log('Batch committed successfully.');

        // Start a new batch for the next set of operations, unless we just committed the last batch
        if (totalOperations < keys.length) {
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

  console.log(`Import process finished. Attempted to process ${keys.length} items.`);
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
