// Display the average buy and sell price for a specific stock.

import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:37017";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("InvestoryData");
    const transactions = database.collection("Transactions");

    // Query parameter to specify the stock
    const stockSymbol = "TSLA"; // Replace with desired stock symbol

    // Step 1: Aggregate data to calculate average buy price for this stock
    const aggregationPipelineBuy = [
      {
        $match: { stock_symbol: stockSymbol, type_of_trade: "BUY" } // Filter only BUY transactions
      },
      {
        $group: {
          _id: "$stock_symbol",
          averageBuyPrice: { $avg: "$price" } // Calculate average price
        }
      }
    ];

    const aggregationResultBuy = await transactions.aggregate(aggregationPipelineBuy).toArray();
    if (aggregationResultBuy.length === 0) {
      console.log(`No BUY transactions found for stock_symbol "${stockSymbol}".`);
      return;
    }

    const averageBuyPrice = aggregationResultBuy[0].averageBuyPrice;

    // Step 2: Aggregate data to calculate average sell price for this stock
    const aggregationPipelineSell = [
        {
          $match: { stock_symbol: stockSymbol, type_of_trade: "SELL" } // Filter only BUY transactions
        },
        {
          $group: {
            _id: "$stock_symbol",
            averageBuyPrice: { $avg: "$price" } // Calculate average price
          }
        }
      ];
  
      const aggregationResultSell = await transactions.aggregate(aggregationPipelineSell).toArray();
      if (aggregationResultSell.length === 0) {
        console.log(`No SELL transactions found for stock_symbol "${stockSymbol}".`);
        return;
      }
    const averageSellPrice = aggregationResultSell[0].averageSellPrice;

    console.log(`stock_symbol "${stockSymbol}" has an average Buy Price: ${averageBuyPrice} and averageSellPrice: ${averageSellPrice}`);
    } finally {
    // Ensure the client closes properly
    await client.close();
  }
}
run().catch(console.dir);