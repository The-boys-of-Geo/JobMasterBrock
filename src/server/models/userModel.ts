import { Pool, QueryResult } from 'pg';
// import dotenv from 'dotenv';
// dotenv.config();
const PG_URI =
  process.env.DB_URL ||
  'postgres://titmxapf:7zZg8KnhAoS7lAd6X6iooORXUHBPImXT@lallah.db.elephantsql.com/titmxapf';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

// Adding some notes about the database here will be helpful for future you or other developers.
// Schema for the database can be found below:
// https://github.com/CodesmithLLC/unit-10SB-databases/blob/master/docs/assets/images/schema.png

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database

export default {
  query: async (text: string, params?: any[]): Promise<QueryResult<any>> => {
    console.log('executed query', text);
    return pool.query(text, params);
  },
};
