const {
    insertIOCs,
    getIOCsByReportId,
    updateIOCs,
    deleteIOCs,
    countTotalIOCs,
  } = require('./tI-report-IOCs.service');
  
  /**
   * Insert IOCs for a specific report
   * @param {object} req - The request object
   * @param {object} reply - The Fastify reply object
   */
  const insertIOCsController = async (req, reply) => {
    const { reportId } = req.params;
    const iocData = req.body;
  
    try {
      // Validate input
      if (!reportId || !iocData) {
        return reply.status(400).send({ error: 'Report ID and IOCs data are required' });
      }
  
      // Call the service function
      const result = await insertIOCs(reportId, iocData);
  
      // Send response
      reply.status(201).send(result);
    } catch (error) {
      console.error('Error in insertIOCsController:', error);
      reply.status(500).send({ error: error.message });
    }
  };
  
  /**
   * Get IOCs by Report ID
   * @param {object} req - The request object
   * @param {object} reply - The Fastify reply object
   */
  const getIOCsByReportIdController = async (req, reply) => {
    const { reportId } = req.params;
  
    try {
      // Validate input
      if (!reportId) {
        return reply.status(400).send({ error: 'Report ID is required' });
      }
  
      // Call the service function
      const result = await getIOCsByReportId(reportId);
  
      // Send response
      if (!result) {
        return reply.status(404).send({ error: 'IOCs not found for the given report ID' });
      }
  
      reply.status(200).send(result);
    } catch (error) {
      console.error('Error in getIOCsByReportIdController:', error);
      reply.status(500).send({ error: error.message });
    }
  };
  
  /**
   * Update IOCs for a specific report
   * @param {object} req - The request object
   * @param {object} reply - The Fastify reply object
   */
  const updateIOCsController = async (req, reply) => {
    const { reportId } = req.params;
    const iocData = req.body;
  
    try {
      // Validate input
      if (!reportId || !iocData) {
        return reply.status(400).send({ error: 'Report ID and IOCs data are required' });
      }
  
      // Call the service function
      const result = await updateIOCs(reportId, iocData);
  
      // Send response
      if (!result) {
        return reply.status(404).send({ error: 'IOCs not found for the given report ID' });
      }
  
      reply.status(200).send(result);
    } catch (error) {
      console.error('Error in updateIOCsController:', error);
      reply.status(500).send({ error: error.message });
    }
  };
  
  /**
   * Delete IOCs for a specific report
   * @param {object} req - The request object
   * @param {object} reply - The Fastify reply object
   */
  const deleteIOCsController = async (req, reply) => {
    const { reportId } = req.params;
  
    try {
      // Validate input
      if (!reportId) {
        return reply.status(400).send({ error: 'Report ID is required' });
      }
  
      // Call the service function
      await deleteIOCs(reportId);
  
      // Send response
      reply.status(200).send({ message: 'IOCs deleted successfully' });
    } catch (error) {
      console.error('Error in deleteIOCsController:', error);
      reply.status(500).send({ error: error.message });
    }
  };
  
  /**
   * Count total IOCs
   * @param {object} req - The request object
   * @param {object} reply - The Fastify reply object
   */
  const countTotalIOCsController = async (req, reply) => {
    try {
      const totalIOCs = await countTotalIOCs();
      reply.status(200).send({ totalIOCs });
    } catch (error) {
      console.error('Error in countTotalIOCsController:', error);
      reply.status(500).send({ error: error.message });
    }
  };
  
  module.exports = {
    insertIOCsController,
    getIOCsByReportIdController,
    updateIOCsController,
    deleteIOCsController,
    countTotalIOCsController,
  };