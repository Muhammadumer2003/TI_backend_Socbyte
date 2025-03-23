const {
    insertIOCsController,
    getIOCsByReportIdController,
    updateIOCsController,
    deleteIOCsController,
    countTotalIOCsController,
  } = require('./tI-report-IOCs.controller');       
  
 
  const iocsRoutes = async (fastify) => {
    // Insert IOCs
    fastify.post('/reports/:reportId/iocs', async (request, reply) => {
      await insertIOCsController(request, reply);
    });
  
    // Get IOCs by Report ID
    fastify.get('/reports/:reportId/iocs', async (request, reply) => {
      await getIOCsByReportIdController(request, reply);
    });
  
    // Update IOCs
    fastify.put('/reports/:reportId/iocs', async (request, reply) => {
      await updateIOCsController(request, reply);
    });
  
    // Delete IOCs
    fastify.delete('/reports/:reportId/iocs', async (request, reply) => {
      await deleteIOCsController(request, reply);
    });

    // Count total IOCs
    fastify.get('/reports/iocs/count', async (request, reply) => {
      await countTotalIOCsController(request, reply);
    });
  };
  
  module.exports = iocsRoutes;