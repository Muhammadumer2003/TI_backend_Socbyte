const db = require('../config/db.js');

const createCommentTable = async () => {
  const exists = await db.schema.hasTable('ti_report_comments');
  if (!exists) {
    await db.schema.createTable('ti_report_comments', (table) => {
      table.increments('id').primary();
      table.integer('report_id').notNullable();
      table.string('TIid').notNullable(); // TIid field
      table.string('username').notNullable();
      table.text('comment');
      table.integer('parentComment').unsigned().nullable(); // Parent comment ID
      table.foreign('parentComment').references('id').inTable('ti_report_comments'); // Foreign key reference
      table.foreign('report_id').references('ref_id').inTable('ti_reports'); // Foreign key reference
      table.text('summary');
    //   table.string('impact');
    //   table.text('remediation');
      // table.string('group');
      // table.string('contributors');
    //   table.string('status');
    //   table.string('type');
    //   table.string('source');
      // table.timestamp('escalatedAt');
      // table.timestamp('closedAt')
      // table.string('escalatedBy');
      // table.timestamp('originDate');
    //   table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    });
  }
};

createCommentTable();

module.exports = {  createCommentTable };