# Investory-MongoDB-App

Investory is a basic NodeExpress-Mongo-EJS Application which allows trader to mark their transactions, and view them conveniently by searching for their trader ID.

## How to use it:

1) Clone the repo
2) Install the dependencies

```
npm install
```

3) Start the server

```
npm start
```

4) Point your browser to http://locahost:3000

## Diagrams and Documents for reference: 

### 1. Requirement Document
Includes business requirement in a PDF format.
    Requirements.pdf

### 2. UML Diagram
Includes a UML Diagram to explain the connections between various entities.
    UML_Diagram.JPG

### 3. SQL Model
Includes heirarchical SQL model of the DB. Model represents various collections - embeddings, references.
    SQL_ERD_Diagram.png

### 4. JSON Collection examples
Includes a SQL diagram of various collections in the model.
    NO_SQL_DIAGRAM.png


## How to load data

* Download the below mentioned files
        * Transactions.dump
        * Trader.dump
        * Stocks.dump
        * Watchlist.dump
        * Portfolios.dump

* Install latest version of MongoDB community. 

* start localhost:37017 (I have used 37017 as I was using 27017 for another project, but if you plan to use 27017, change it everywhere in the steps below!)

* Go inside the databases folder and import the files using mongoimport. I am If you already have port 27017 used, use 37017. If using terminal, go to the repo folder, and input the below commands one at a time.

```mongoimport -h localhost:37017 -d InvestoryData -c Trader  --file Trader.dump ```

```mongoimport -h localhost:37017 -d InvestoryData -c Stocks  --file stocks.dump ```

```mongoimport -h localhost:37017 -d InvestoryData -c Transactions  --file Transactions.dump ```

```mongoimport -h localhost:37017 -d InvestoryData -c Watchlist  --file Watchlist.dump ```

```mongoimport -h localhost:37017 -d InvestoryData -c Portfolios  --file Portfolios.dump ```

## Queries to analyse few things making sure the data is working fine.

### 1. Profit and Loss of a single trader_id, 1 taken for this example.
```node Finding_profit_or_loss.js ```


