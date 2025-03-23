// tI-report-comments/tI-report-comment.service.js
const db = require('../config/db.js');

// Function to get all comments
const getAllComments = async () => {
    return await db('ti_report_comments').select('*');
};

// Function to get a comment by ID
const getCommentById = async (id) => {
    return await db('ti_report_comments').where({ id }).first();
};

// Function to get comments by report ID
const getCommentsByReportId = async (reportId) => {
    return await db('ti_report_comments').where({ report_id: reportId }).select('*');
};

// Function to create a new comment
const createComment = async (data) => {
    const [newComment] = await db('ti_report_comments').insert(data).returning('*');
    return newComment;
};

// Function to update a comment
const updateComment = async (id, data) => {
    const [updatedComment] = await db('ti_report_comments').where({ id }).update(data).returning('*');
    return updatedComment;
};

// Function to delete a comment
const deleteComment = async (id) => {
    return await db('ti_report_comments').where({ id }).del();
};

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment, 
    getCommentsByReportId
};