// Uses agregation to find the total quantity of stocks bought by each trader.

import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:37017";
const client = new MongoClient(uri);


async function run() {
    try {
        const database = client.db("InvestoryData");
        const transactions = database.collection("Transactions");

        // Aggregation query to find the total quantity of stocks bought by each trader
        const aggregationPipeline = [
            {
                $match: { type_of_trade: "BUY" }
            },
            {
                $group: {
                    _id: "$trader_id",
                    totalQuantityBought: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "Trader",
                    localField: "_id",
                    foreignField: "trader_id",
                    as: "trader_info"
                }
            },
            {
                $unwind: "$trader_info"
            },
            {
                $project: {
                    _id: 1,
                    trader_id: "$trader_id",
                    trader_name: "$trader_info.name",
                    totalQuantityBought: 1
                }
            }
        ];

        const result = await transactions.aggregate(aggregationPipeline).toArray();
        console.log(result);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);