const CVE = require('./tI-report-cves.model');

// Get all CVEs
const getAllCves = async () => {
    return await CVE.getAll();
};

// Get CVE by ID
const getCveById = async (id) => {
    return await CVE.getById(id);
};

// Get CVEs by Report ID
const getCvesByReportId = async (reportId) => {
    return await CVE.getByReportId(reportId);
};

// Create a new CVE
const createCve = async (data) => {
    try {
        console.log('Data to insert:', data); // Log the data being inserted
        const newCVE = await CVE.create(data);
        return newCVE;
    } catch (error) {
        console.error('Error in createCve service:', error);
        throw new Error('Database error: ' + error.message);
    }
};

// Update an existing CVE
const updateCve = async (id, data) => {
    return await CVE.update(id, data);
};

// Delete a CVE
const deleteCve = async (id) => {
    return await CVE.delete(id);
};

// Count total CVEs
const countTotalCves = async () => {
    try {
        return await CVE.count(); // Call the count method directly
    } catch (error) {
        console.error('Error counting total CVEs:', error); // Log the error for debugging
        throw new Error('Failed to count total CVEs: ' + error.message);
    }
};

// Count CVEs by Report ID
const countCvesByReportId = async (reportId) => {
    const result = await CVE.countByReportId(reportId);
    return result.count; // Return the count of CVEs for the specific report
};

module.exports = {
    getAllCves,
    getCveById,
    getCvesByReportId,
    createCve,
    updateCve,
    deleteCve,
    countTotalCves,
    countCvesByReportId
};