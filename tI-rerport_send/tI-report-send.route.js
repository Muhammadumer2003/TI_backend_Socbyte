const TiReportSendController = require('./tI-report-send.controller');

async function tiReportSendRoutes(fastify, options) {
  fastify.post('/ti-report-send', TiReportSendController.create);
  fastify.get('/ti-report-send/getall', TiReportSendController.getAll);
  fastify.get('/ti-report-send/:id', TiReportSendController.getById);
  fastify.put('/ti-report-send/:id', TiReportSendController.update);
  fastify.delete('/ti-report-send/:id', TiReportSendController.delete);
}

module.exports = tiReportSendRoutes;
