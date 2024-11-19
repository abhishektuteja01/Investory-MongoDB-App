
import { getTransactions } from './db/myMongoDB';
import { MongoClient } from 'mongodb';

jest.mock('mongodb', () => {
  const mCollection = {
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    toArray: jest.fn().mockResolvedValue([{ transaction_id: '123' }]),
  };
  const mDb = { collection: jest.fn(() => mCollection) };
  const mClient = { db: jest.fn(() => mDb), close: jest.fn() };
  return { MongoClient: jest.fn(() => mClient) };
});

describe('getTransactions', () => {
  it('should fetch transactions based on query, page, and pageSize', async () => {
    const query = { trader_id: 'trader123' };
    const page = 1;
    const pageSize = 10;

    const transactions = await getTransactions(query, page, pageSize);

    expect(transactions).toEqual([{ transaction_id: '123' }]);
    expect(MongoClient).toHaveBeenCalledWith(process.MONGO_URL || "mongodb://localhost:37017");
    const client = MongoClient.mock.instances[0];
    expect(client.db).toHaveBeenCalledWith(process.DB_NAME || "InvestoryData");
    const db = client.db.mock.results[0].value;
    expect(db.collection).toHaveBeenCalledWith('Transactions');
    const collection = db.collection.mock.results[0].value;
    expect(collection.find).toHaveBeenCalledWith(query);
    expect(collection.sort).toHaveBeenCalledWith({ timestamp: -1 });
    expect(collection.limit).toHaveBeenCalledWith(pageSize);
    expect(collection.skip).toHaveBeenCalledWith((page - 1) * pageSize);
    expect(collection.toArray).toHaveBeenCalled();
    expect(client.close).toHaveBeenCalled();
  });
});