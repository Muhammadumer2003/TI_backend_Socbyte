
const cveController = require('./tI-report-cves.controller');

module.exports = async function (fastify) {

// Define routes
fastify.get('/cve/getall', cveController.getAllCves);
fastify.get('/cve/getbyid/:id', cveController.getCveById);
fastify.get('/cve/getbyreportid/:reportId', cveController.getCvesByReportId); // New route for fetching CVEs by report ID
fastify.post('/cve/create', cveController.createCve);
fastify.put('/cve/update/:id', cveController.updateCve);
fastify.delete('/cve/delete/:id', cveController.deleteCve);
fastify.get('/cve/count', cveController.countTotalCves); // New route for counting total CVEs
fastify.get('/cve/count/report/:reportId', cveController.countCvesByReportId); // New route for counting CVEs by report ID


}

