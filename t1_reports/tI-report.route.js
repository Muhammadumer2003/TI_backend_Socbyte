const controller = require('./tI-report.controller');

module.exports = async function (fastify) {
  fastify.get('/reports/getall', controller.getAllReports);
  fastify.get('/reports/:id', controller.getReportById);
  fastify.post('/reports', controller.createReport);
  fastify.put('/reports/:id', controller.updateReport);
  fastify.delete('/reports/:id', controller.deleteReport);
  fastify.get('/reports/count-advisory', controller.countAdvisoryReports);
};