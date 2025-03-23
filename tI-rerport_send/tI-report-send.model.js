const db = require('../config/db.js');

const createTiReportSendTable = async () => {
  const exists = await db.schema.hasTable('ti_report_send');
  if (!exists) {
    await db.schema.createTable('ti_report_send', (table) => {
      table.increments('id').primary(); // Auto-incrementing primary key
      table.integer('reportId').unsigned().notNullable(); // Foreign key to ti_report table
      table.string('tenantID'); // Tenant ID from local storage
      table.string('status').notNullable(); // Status of the report send
      table.specificType('group', 'TEXT[]'); // Store list as PostgreSQL array
      table.specificType('contributors', 'TEXT[]'); // Store list as PostgreSQL array
      table.timestamps(true, true); // Adds `created_at` and `updated_at` timestamps

      // Foreign key constraint (optional, ensures referential integrity)
      table.foreign('reportId').references('ref_id').inTable('ti_report').onDelete('CASCADE');
    });

    console.log('ti_report_send table created successfully.');
  } else {
    console.log('ti_report_send table already exists.');
  }
};

createTiReportSendTable();

module.exports = { createTiReportSendTable };