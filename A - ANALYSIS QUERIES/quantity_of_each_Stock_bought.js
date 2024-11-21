// Uses countDocuments to count how many quantities of each stock were bought.

import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:37017";
const client = new MongoClient(uri);

async function run() {
    try {
      const database = client.db("InvestoryData");
      const transactions = database.collection("Transactions");
  
      // Find all unique stock symbols
      const stockSymbols = await transactions.distinct("stock_symbol", { type_of_trade: "BUY" });
  
      // Count the number of BUY transactions for each stock symbol
      const buyCounts = {};
      for (const symbol of stockSymbols) {
        const count = await transactions.countDocuments({ stock_symbol: symbol, type_of_trade: "BUY" });
        buyCounts[symbol] = count;
      }
  
      console.log("Stock Buy Counts:", buyCounts);
    } finally {
      // Ensure the client closes properly
      await client.close();
    }
  }
  run().catch(console.dir);