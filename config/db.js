const knex = require('knex');
require('dotenv').config(); // Load environment variables from .env file

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST ,
    port: process.env.DB_PORT ,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD ,
    database: process.env.DATABASE ,
  },
  pool: { min: 2, max: 10 }, // Connection pooling
});

// Check if the database connection is working
db.raw('SELECT 1')
  .then(() => {
    console.log('✅ PostgreSQL Database Connected Successfully');
  })
  .catch((err) => {
    console.error('❌ Database Connection Failed:', err.message);
    process.exit(1); // Exit process if DB connection fails
  });

module.exports = db;
