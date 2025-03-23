const db = require('../config/db.js');

const createIOCsTable = async () => {
  const exists = await db.schema.hasTable('iocs');
  if (!exists) {
    await db.schema.createTable('iocs', (table) => {
      table.increments('id').primary(); // Primary key
      table.integer('reportId').unsigned().notNullable(); // Foreign key to ti_report
      table.json('IOC').notNullable(); // Store IOCs as JSON
      table.string('type').notNullable(); // Store IOCs as JSON
      table.timestamps(true, true); // Created at and updated at timestamps

      // Foreign key constraint
      table.foreign('reportId').references('ref_id').inTable('ti_report').onDelete('CASCADE');
    });
    console.log('IOCs table created');
  } else {
    console.log('IOCs table already exists');
  }
};

module.exports = {
  createIOCsTable,
};