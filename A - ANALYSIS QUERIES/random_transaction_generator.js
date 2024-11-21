// Randomly selects a transaction from the transactions collection

import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:37017";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("InvestoryData");
    const transactions = database.collection("Transactions");

    // Step 1: Find a random transaction
    const randomTransaction = await transactions.aggregate([{ $sample: { size: 1 } }]).toArray();

    if (randomTransaction.length > 0) {
      console.log("Random Transaction: ", randomTransaction[0]);
    } else {
      console.log("No transactions found.");
    }
  } finally {
    // Ensure the client closes properly
    await client.close();
  }
}
run().catch(console.dir);