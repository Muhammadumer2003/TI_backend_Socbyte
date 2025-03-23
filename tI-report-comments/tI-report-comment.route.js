// tI-report-comments/tI-report-comment.route.js
const commentController = require('./tI-reports-comment.controller.js');

module.exports = async (fastify, options) => {
    // Route to get all comments
    fastify.get('/comments/getall', commentController.getAllComments);

    // Route to get a comment by ID
    fastify.get('/comments/getbyid/:id', commentController.getCommentById);

    // Route to get comments by report ID
    fastify.get('/comments/getbyreportid/:id', commentController.getCommentsByReportId);

    // Route to create a new comment
    fastify.post('/comments/create', commentController.createComment);

    // Route to update a comment
    fastify.put('/comments/update/:id', commentController.updateComment);

    // Route to delete a comment
    fastify.delete('/comments/delete/:id', commentController.deleteComment);
};