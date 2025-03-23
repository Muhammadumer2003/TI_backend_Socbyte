const TiReportSendService = require('./tI-report-send.service');

const TiReportSendController = {
  async create(req, reply) {
    try {
      const newReport = await TiReportSendService.create(req.body);
      reply.code(201).send({ success: true, data: newReport });
    } catch (error) {
      reply.code(500).send({ success: false, error: error.message });
    }
  },

  async getAll(req, reply) {
    try {
      const reports = await TiReportSendService.getAll();
      reply.send({ success: true, data: reports });
    } catch (error) {
      reply.code(500).send({ success: false, error: error.message });
    }
  },

  async getById(req, reply) {
    try {
      const report = await TiReportSendService.getById(req.params.id);
      if (!report) {
        return reply.code(404).send({ success: false, message: 'Report not found' });
      }
      reply.send({ success: true, data: report });
    } catch (error) {
      reply.code(500).send({ success: false, error: error.message });
    }
  },

  async update(req, reply) {
    try {
      const updated = await TiReportSendService.update(req.params.id, req.body);
      if (!updated) {
        return reply.code(404).send({ success: false, message: 'Report not found' });
      }
      reply.send({ success: true, message: 'Report updated successfully' });
    } catch (error) {
      reply.code(500).send({ success: false, error: error.message });
    }
  },

  async delete(req, reply) {
    try {
      const deleted = await TiReportSendService.delete(req.params.id);
      if (!deleted) {
        return reply.code(404).send({ success: false, message: 'Report not found' });
      }
      reply.send({ success: true, message: 'Report deleted successfully' });
    } catch (error) {
      reply.code(500).send({ success: false, error: error.message });
    }
  },
};

module.exports = TiReportSendController;
