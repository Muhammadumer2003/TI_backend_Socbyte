const service = require('./tI-report.service');

const getAllReports = async (req, reply) => {
  const reports = await service.getAllReports();
  reply.send(reports);
};

const getReportById = async (req, reply) => {
  const report = await service.getReportById(req.params.id);
  if (!report) return reply.status(404).send({ error: 'Report not found' });
  reply.send(report);
};

const createReport = async (req, reply) => {
  const report = await service.createReport(req.body);
  reply.status(201).send(report);
};

const updateReport = async (req, reply) => {
  const report = await service.updateReport(req.params.id, req.body);
  reply.send(report);
};

const deleteReport = async (req, reply) => {
  await service.deleteReport(req.params.id);
  reply.send({ message: 'Report deleted' });
};

const countAdvisoryReports = async (req, reply) => {
  const count = await service.countAdvisoryReports();
  reply.send(count);
};

module.exports = { getAllReports, getReportById , createReport, updateReport, deleteReport, countAdvisoryReports };
