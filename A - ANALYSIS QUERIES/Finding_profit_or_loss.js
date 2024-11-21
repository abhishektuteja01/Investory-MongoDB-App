// This code allows me to find the profit or loss for a trader with trader_id 1. We can change the trader_id to find the profit or loss for any other trader.

import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:37017";
const client = new MongoClient(uri);

async function run() {
    try {
      const database = client.db("InvestoryData");
      const transactions = database.collection("Transactions");
  
      // Query for all transactions by trader_id 1
      const query = { trader_id: 1 };
      const traderTransactions = await transactions.find(query).toArray();
  
      let totalPnl = 0;
      const stockHoldings = {};
  
      traderTransactions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Sort by timestamp
  
      traderTransactions.forEach((transaction) => {
        const { stock_symbol, quantity, type_of_trade, price } = transaction;
  
        if (type_of_trade === "BUY") {
          // Update holdings for buy trades
          if (!stockHoldings[stock_symbol]) {
            stockHoldings[stock_symbol] = { quantity: 0, totalCost: 0 };
          }
          stockHoldings[stock_symbol].quantity += quantity;
          stockHoldings[stock_symbol].totalCost += quantity * price;
        } else if (type_of_trade === "SELL") {
          // Calculate PnL for sell trades
          if (stockHoldings[stock_symbol] && stockHoldings[stock_symbol].quantity >= quantity) {
            const averageCost =
              stockHoldings[stock_symbol].totalCost / stockHoldings[stock_symbol].quantity;
  
            const pnl = (price - averageCost) * quantity;
            totalPnl += pnl;
  
            // Update holdings after sell trades
            stockHoldings[stock_symbol].quantity -= quantity;
            stockHoldings[stock_symbol].totalCost -= averageCost * quantity;
  
            if (stockHoldings[stock_symbol].quantity === 0) {
              delete stockHoldings[stock_symbol];
            }
          } else {
            console.error(`Invalid sell transaction: insufficient holdings for ${stock_symbol}`);
          }
        }
      });
  
      console.log(`Total PnL for trader_id 1: ${totalPnl}`);
    } finally {
      await client.close();
    }
  }
  
  run().catch(console.dir);