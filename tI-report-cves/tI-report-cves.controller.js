const CVEService = require('./tI-report-cves.service');

// Get all CVEs
const getAllCves = async (request, reply) => {
    try {
        const cves = await CVEService.getAllCves();
        reply.send(cves);
    } catch (error) {
        reply.status(500).send({ error: 'Failed to fetch CVEs' });
    }
};

// Get CVE by ID
const getCveById = async (request, reply) => {
    try {
        const cve = await CVEService.getCveById(request.params.id);
        if (cve) {
            reply.send(cve);
        } else {
            reply.status(404).send({ error: 'CVE not found' });
        }
    } catch (error) {
        reply.status(500).send({ error: 'Failed to fetch CVE' });
    }
};

// Get CVEs by Report ID
const getCvesByReportId = async (request, reply) => {
    try {
        const cves = await CVEService.getCvesByReportId(request.params.reportId);
        if (cves.length > 0) {
            reply.send(cves);
        } else {
            reply.status(404).send({ error: 'No CVEs found for this report' });
        }
    } catch (error) {
        console.error('Error fetching CVEs for report:', error);
        reply.status(500).send({ error: 'Failed to fetch CVEs for the report' });
    }
};

// Create a new CVE
const createCve = async (request, reply) => {
    try {
        const newCVE = await CVEService.createCve(request.body);
        reply.status(201).send(newCVE);
    } catch (error) {
        console.error('Error in createCve controller:', error);
        reply.status(500).send({ error: 'Failed to create CVE: ' + error.message });
    }
};

// Update an existing CVE
const updateCve = async (request, reply) => {
    try {
        const updatedCVE = await CVEService.updateCve(request.params.id, request.body);
        if (updatedCVE) {
            reply.send(updatedCVE);
        } else {
            reply.status(404).send({ error: 'CVE not found' });
        }
    } catch (error) {
        reply.status(500).send({ error: 'Failed to update CVE' });
    }
};

// Delete a CVE
const deleteCve = async (request, reply) => {
    try {
        const deleted = await CVEService.deleteCve(request.params.id);
        if (deleted) {
            reply.status(204).send();
        } else {
            reply.status(404).send({ error: 'CVE not found' });
        }
    } catch (error) {
        reply.status(500).send({ error: 'Failed to delete CVE' });
    }
};

// Count total CVEs
const countTotalCves = async (request, reply) => {
    try {
        const totalCount = await CVEService.countTotalCves();
        reply.send({ totalCves: totalCount });
    } catch (error) {
        console.error('Error counting total CVEs in controller:', error);
        reply.status(500).send({ error: 'Failed to count total CVEs' });
    }
};

// Count CVEs by Report ID
const countCvesByReportId = async (request, reply) => {
    try {
        const count = await CVEService.countCvesByReportId(request.params.reportId);
        reply.send({ count });
    } catch (error) {
        reply.status(500).send({ error: 'Failed to count CVEs for the report' });
    }
};

// Export the controller methods
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