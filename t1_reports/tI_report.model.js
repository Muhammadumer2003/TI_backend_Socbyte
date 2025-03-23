const db = require('../config/db.js');

const createTable = async () => {
  const exists = await db.schema.hasTable('ti_report');
  if (!exists) {
    await db.schema.createTable('ti_report', (table) => {
      table.increments('ref_id').primary();
      table.string('title').notNullable();
      table.text('subtitle');
      table.text('summary');
      table.string('impact');
      table.text('remediation');
      // table.string('group');
      // table.string('contributors');
      table.string('status');
      table.string('type');
      table.string('source');
      // table.timestamp('escalatedAt');
      // table.timestamp('closedAt');
      // table.string('escalatedBy');
      // table.timestamp('originDate');
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    });
  }
};

createTable();

module.exports = {  createTable };