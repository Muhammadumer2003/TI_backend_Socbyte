const db = require('../config/db.js');

/**
 * Insert IOCs for a specific report
 * @param {number} reportId - The ID of the report
 * @param {object} iocData - The IOCs data (Hashes, IP Addresses, URLs/Domains/Emails)
 * @returns {object} - The inserted IOCs record
 */
const insertIOCs = async (reportId, iocData) => {
  try {
    const [ioc] = await db('iocs').insert({
      reportId,
      IOC: iocData,
    }).returning('*'); // Return the inserted record

    return ioc;
  } catch (error) {
    console.error('Error inserting IOCs:', error);
    throw error;
  }
};

/**
 * Get IOCs by Report ID
 * @param {number} reportId - The ID of the report
 * @returns {object} - The IOCs data for the report
 */
const getIOCsByReportId = async (reportId) => {
  try {
    const iocs = await db('iocs').where({ reportId }).first();
    return iocs;
  } catch (error) {
    console.error('Error fetching IOCs:', error);
    throw error;
  }     
};

const countTotalIOCs = async () => {
  try {
    const totalIOCs = await db('iocs').count('*').first();
    return totalIOCs;
  } catch (error) {
    console.error('Error counting total IOCs:', error);
    throw error;    
  }
};
/**
 * Update IOCs for a specific report
 * @param {number} reportId - The ID of the report
 * @param {object} iocData - The updated IOCs data
 * @returns {object} - The updated IOCs record
 */
const updateIOCs = async (reportId, iocData) => {
  try {
    const [ioc] = await db('iocs')
      .where({ reportId })
      .update({
        IOC: iocData,
        updated_at: db.fn.now(), // Update the timestamp
      })
      .returning('*'); // Return the updated record

    return ioc;
  } catch (error) {
    console.error('Error updating IOCs:', error);
    throw error;
  }
};

/**
 * Delete IOCs for a specific report
 * @param {number} reportId - The ID of the report
 * @returns {boolean} - True if deletion was successful
 */
const deleteIOCs = async (reportId) => {
  try {
    await db('iocs').where({ reportId }).del();
    return true;
  } catch (error) {
    console.error('Error deleting IOCs:', error);
    throw error;
  }
};

module.exports = {
  insertIOCs,
  getIOCsByReportId,
  updateIOCs,
  deleteIOCs,
  countTotalIOCs,
};