const db = require('../config/db.js');

const getAllReports = async () => db('ti_report').select('*');
const getReportById = async (id) => db('ti_report').where({ ref_id: id }).first();
const createReport = async (data) => db('ti_report').insert(data).returning('*');
const updateReport = async (id, data) => db('ti_report').where({ ref_id: id }).update(data).returning('*');
const deleteReport = async (id) => db('ti_report').where({ ref_id: id }).del();
//create for countreport whose type==Advisory
const countAdvisoryReports = async () => db('ti_report').where({ type: 'Advisory' }).count('*').first();

module.exports = { getAllReports, getReportById, createReport, updateReport, deleteReport, countAdvisoryReports };