const db = require('../config/db.js');

const TiReportSendService = {
  async create(reportData) {
    // Ensure group and contributors are arrays before inserting
    const formattedData = {
      ...reportData,
      group: Array.isArray(reportData.group) ? reportData.group : [],
      contributors: Array.isArray(reportData.contributors) ? reportData.contributors : []
    };

    console.log("Formatted Data Before Insert:", formattedData); // Debugging

    // Insert and return all fields
    const [insertedRecord] = await db('ti_report_send')
      .insert(formattedData)
      .returning(['id', 'reportId', 'tenantID', 'status', 'group', 'contributors', 'created_at', 'updated_at']);

    console.log("Inserted Record:", insertedRecord); // Debugging

    return {
      success: true,
      data: insertedRecord
    };
  },

  async getAll() {
    const reports = await db('ti_report_send').select('*');

    return {
      success: true,
      data: reports
    };
  },

  async getById(id) {
    const report = await db('ti_report_send').where({ id }).first();
    if (report) {
      return { success: true, data: report };
    }
    return { success: false, message: "Report not found" };
  },

  async update(id, updatedData) {
    // Ensure group and contributors are arrays before updating
    if (updatedData.group) updatedData.group = Array.isArray(updatedData.group) ? updatedData.group : [];
    if (updatedData.contributors) updatedData.contributors = Array.isArray(updatedData.contributors) ? updatedData.contributors : [];

    const updated = await db('ti_report_send')
      .where({ id })
      .update(updatedData, ['id', 'reportId', 'tenantID', 'status', 'group', 'contributors', 'created_at', 'updated_at']);

    if (!updated.length) {
      return { success: false, message: "Report not found" };
    }

    return {
      success: true,
      message: "Report updated successfully",
      data: updated[0]
    };
  },

  async delete(id) {
    const deleted = await db('ti_report_send').where({ id }).del();
    return deleted ? { success: true, message: "Report deleted successfully" } : { success: false, message: "Report not found" };
  },
};

module.exports = TiReportSendService;
