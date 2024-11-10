# Investory-MongoDB-App

A basic application the uses Node+Express+EJS+MongoDB to track transactions across various traders and stocks.

# Requirement Document
Includes business requirement in a PDF format.
    Requirements.pdf

# SQL Model
Includes heirarchical SQL model of the DB. Model represents various collections - embeddings, references.
    SQL_ERD_Diagram.png

# JSON Collection examples
Includes a SQL diagram of various collections in the model.
    NO_SQL_DIAGRAM.png


# How to load data

* Download the below mentioned files
        * Transactions.dump
        * Trader.dump
        * Stocks.dump
        * Watchlist.dump
        * Portfolios.dump

* Install latest version of MongoDB community. 

* start localhost:37017 (I have used 37017 as I was using 27017 for another project, but if you plan to use 27017, change it everywhere in the steps below!)

* Import the file using mongoimport. I am If you already have port 27017 used, use 37017
```mongoimport -h localhost:37017 -d InvestoryData -c Trader  --file Trader.dump ```

```mongoimport -h localhost:37017 -d InvestoryData -c Stocks  --file stocks.dump ```

```mongoimport -h localhost:37017 -d InvestoryData -c Transactions  --file Transactions.dump ```

```mongoimport -h localhost:37017 -d InvestoryData -c Watchlist  --file Watchlist.dump ```

```mongoimport -h localhost:37017 -d InvestoryData -c Portfolios  --file Portfolios.dump ```


