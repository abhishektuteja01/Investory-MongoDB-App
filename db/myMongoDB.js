import {MongoClient} from 'mongodb';

//import sqlite3 from "sqlite3"; "Not needed as MongoDB is used"
//import { open } from "sqlite"; "Not needed as MongoDB is used"

const uri = process.MONGO_URL || "mongodb://localhost:37017";
const DB_NAME = process.DB_NAME ||"InvestoryData";

 
export async function getTransactions(query, page, pageSize) {
  console.log("getTransactions", query);
  const client = new MongoClient(uri);

  try{
    const transactionscol = client.db(DB_NAME).collection('Transactions');
    return transactionscol
    .find(query)
    .sort({timestamp: -1})
    .limit(pageSize)
    .skip((page-1) * pageSize)
    .toArray();
  } finally {
    await client.close();
  }
  
  // const mongoQuery = {
  //   transaction_id : { $regex: query, $options: "i" }
  // }

  // const db = await open({
  //   filename: "./db/project1.db",
  //   driver: sqlite3.Database,
  // });

  // const stmt = await db.prepare(`
  //   SELECT * FROM Transactions
  //   WHERE trader_id LIKE @query
  //   ORDER BY timestamp DESC
  //   LIMIT @pageSize
  //   OFFSET @offset;
  // `);

  // const params = {
  //   "@query": query + "%",
  //   "@pageSize": pageSize,
  //   "@offset": (page - 1) * pageSize,
  // };

  // try {
  //   return await stmt.all(params);
  // } finally {
  //   await stmt.finalize();
  //   db.close();
  // }
}

// export async function getTransactionsCount(query) {
//   console.log("getTransactions", query);

//   const db = await open({
//     filename: "./db/project1.db",
//     driver: sqlite3.Database,
//   });

//   const stmt = await db.prepare(`
//     SELECT COUNT(*) AS count
//     FROM Transactions
//     WHERE trader_id LIKE @query;
//   `);

//   const params = {
//     "@query": query + "%",
//   };

//   try {
//     return (await stmt.get(params)).count;
//   } finally {
//     await stmt.finalize();
//     db.close();
//   }
// }

// export async function getTransactionByID(transaction_id) {
//   console.log("getTransactionByID", transaction_id);

//   const db = await open({
//     filename: "./db/project1.db",
//     driver: sqlite3.Database,
//   });

//   const stmt = await db.prepare(`
//     SELECT * FROM Transactions
//     WHERE transaction_id = @transaction_id;
//   `);

//   const params = {
//     "@transaction_id": transaction_id,
//   };

//   try {
//     return await stmt.get(params);
//   } finally {
//     await stmt.finalize();
//     db.close();
//   }
// }

// export async function updateTransactionByID(transaction_id, ref) {
//   console.log("updateTransactionByID", transaction_id, ref);

//   const db = await open({
//     filename: "./db/project1.db",
//     driver: sqlite3.Database,
//   });

//   const stmt = await db.prepare(`
//     UPDATE Transactions
//     SET
//       stock_symbol = @stock_symbol,
//       timestamp = @timestamp,
//       quantity = @quantity,
//       price = @price,
//       type_of_trade = @type_of_trade,
//       @trader_id = @trader_id
//     WHERE
//       transaction_id = @transaction_id;
//   `);

//   const params = {
//     "@transaction_id": transaction_id,
//     "@quantity": ref.quantity,
//     "@price": ref.price,
//     "@type_of_trade": ref.type_of_trade,
//     "@stock_symbol": ref.stock_symbol,
//     "@timestamp": ref.timestamp,
//     "@trader_id": ref.trader_id,
//   };

//   try {
//     return await stmt.run(params);
//   } finally {
//     await stmt.finalize();
//     db.close();
//   }
// }

// export async function deleteTransactionByID(transaction_id) {
//   console.log("deleteTransactionByID", transaction_id);

//   const db = await open({
//     filename: "./db/project1.db",
//     driver: sqlite3.Database,
//   });

//   const stmt = await db.prepare(`
//     DELETE FROM Transactions
//     WHERE
//       transaction_id = @transaction_id;
//   `);

//   const params = {
//     "@transaction_id": transaction_id,
//   };

//   try {
//     return await stmt.run(params);
//   } finally {
//     await stmt.finalize();
//     db.close();
//   }
// }

// export async function insertTransaction(ref) {
//   const db = await open({
//     filename: "./db/project1.db",
//     driver: sqlite3.Database,
//   });

//   const stmt = await db.prepare(`INSERT INTO
//     Transactions(stock_symbol, timestamp, quantity, price, type_of_trade, trader_id)
//     VALUES (@stock_symbol,@timestamp, @quantity, @price, @type_of_trade, @trader_id);`);

//   try {
//     return await stmt.run({
//       "@stock_symbol": ref.stock_symbol,
//       "@timestamp": ref.timestamp,
//       "@quantity": ref.quantity,
//       "@price": ref.price,
//       "@type_of_trade": ref.type_of_trade,
//       "@trader_id": ref.trader_id,
//     });
//   } finally {
//     await stmt.finalize();
//     db.close();
//   }
// }

// export async function getTraderbyTransactionID(transaction_id) {
//   console.log("getTraderbyTransactionID", transaction_id);

//   const db = await open({
//     filename: "./db/project1.db",
//     driver: sqlite3.Database,
//   });

//   const stmt = await db.prepare(`
//     SELECT * FROM Trader
//     NATURAL JOIN Transactions
//     WHERE transaction_id = @transaction_id;
//   `);

//   const params = {
//     "@transaction_id": transaction_id,
//   };

//   try {
//     return await stmt.all(params);
//   } finally {
//     await stmt.finalize();
//     db.close();
//   }
// }


// export async function getTraders(query, page, pageSize) {
//   console.log("getTraders query", query);

//   const db = await open({
//     filename: "./db/project1.db",
//     driver: sqlite3.Database,
//   });

//   const stmt = await db.prepare(`
//     SELECT * FROM Trader
//     WHERE 
//       name LIKE @query
//     ORDER BY name DESC
//     LIMIT @pageSize
//     OFFSET @offset;
//   `);

//   const params = {
//     "@query": query + "%",
//     "@pageSize": pageSize,
//     "@offset": (page - 1) * pageSize,
//   };

//   try {
//     return await stmt.all(params);
//   } finally {
//     await stmt.finalize();
//     db.close();
//   }
// }

// export async function getTradersCount(query) {
//   console.log("getTradersCount query", query);

//   const db = await open({
//     filename: "./db/project1.db",
//     driver: sqlite3.Database,
//   });

//   const stmt = await db.prepare(`
//     SELECT COUNT(*) AS count
//     FROM Trader
//     WHERE 
//       name LIKE @query
//   `);

//   const params = {
//     "@query": query + "%",
//   };

//   try {
//     return (await stmt.get(params)).count;
//   } finally {
//     await stmt.finalize();
//     db.close();
//   }
// }
