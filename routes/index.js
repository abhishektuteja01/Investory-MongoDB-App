import express from "express";
import * as myDb from "../db/mySqliteDB.js";

const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.redirect("/transactions");
});

// http://localhost:3000/transactions?pageSize=24&page=3&q=John
router.get("/transactions", async (req, res, next) => {
  const query = req.query.q || "";
  const page = +req.query.page || 1;
  const pageSize = +req.query.pageSize || 24;
  const msg = req.query.msg || null;
  try {
    let total = await myDb.getTransactionsCount(query);
    let transactions = await myDb.getTransactions(query, page, pageSize);


    res.render("./pages/index", {
      transactions,
      query,
      msg,
      currentPage: page,
      lastPage: Math.ceil(total / pageSize),
    });
  } catch (err) {
    next(err);
  }
});

router.get("/transactions/:transaction_id/edit", async (req, res, next) => {
  const transaction_id = req.params.transaction_id;
  const msg = req.query.msg || null;
  try {
    let tra = await myDb.getTransactionByID(transaction_id);
    let traders = await myDb.getTraderbyTransactionID(transaction_id);

    console.log("edit transaction", {
      tra,
      traders,
      msg,
    });

    res.render("./pages/editTransaction", {
      tra,
      traders,
      msg,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/transactions/:transaction_id/edit", async (req, res, next) => {
  const transaction_id = req.params.transaction_id;
  const tra = req.body;

  try {
    let updateResult = await myDb.updateTransactionByID(transaction_id, tra);
    console.log("update", updateResult);

    if (updateResult && updateResult.changes === 1) {
      res.redirect("/transactions/?msg=Updated");
    } else {
      res.redirect("/transactions/?msg=Error Updating");
    }
  } catch (err) {
    next(err);
  }
});

router.post("/transactions/:transaction_id/addTrader", async (req, res, next) => {
  console.log("Add trader", req.body);
  const transaction_id = req.params.transaction_id;
  const trader_id = req.body.trader_id;
})

router.get("/transactions/:transaction_id/delete", async (req, res, next) => {
  const transaction_id = req.params.transaction_id;

  try {
    let deleteResult = await myDb.deleteTransactionByID(transaction_id);
    console.log("delete", deleteResult);

    if (deleteResult && deleteResult.changes === 1) {
      res.redirect("/transactions/?msg=Deleted");
    } else {
      res.redirect("/transactions/?msg=Error Deleting");
    }
  } catch (err) {
    next(err);
  }
});

router.post("/createTransaction", async (req, res, next) => {
  const ref = req.body;

  try {
    const insertRes = await myDb.insertTransaction(tra);

    console.log("Inserted", insertRes);
    res.redirect("/transactions/?msg=Inserted");
  } catch (err) {
    console.log("Error inserting", err);
    next(err);
  }
});


// http://localhost:3000/transactions?pageSize=24&page=3&q=John
router.get("/traders", async (req, res, next) => {
  const query = req.query.q || "";
  const page = +req.query.page || 1;
  const pageSize = +req.query.pageSize || 24;
  const msg = req.query.msg || null;
  try {
    let total = await myDb.getTradersCount(query);
    let traders = await myDb.getTraders(query, page, pageSize);


    res.render("./pages/index_traders", {
      traders,
      query,
      msg,
      currentPage: page,
      lastPage: Math.ceil(total / pageSize),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
