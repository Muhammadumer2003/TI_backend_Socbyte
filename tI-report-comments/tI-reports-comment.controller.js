// tI-report-comments/tI-report-comment.controller.js
const commentService = require('./tI-report-comment.service.js');
const { createCommentTable } = require('./tI-report-comment.model.js');

// Controller to get all comments
const getAllComments = async (_, reply) => {
    try {
        const comments = await commentService.getAllComments();
        reply.send(comments);
    } catch (error) {
        reply.code(500).send({ error: 'Failed to retrieve comments' });
    }
};

// Controller to get a comment by ID
const getCommentById = async (request, reply) => {
    const { id } = request.params;
    try {
        const comment = await commentService.getCommentById(id);
        if (comment) {
            reply.send(comment);
        } else {
            reply.code(404).send({ error: 'Comment not found' });
        }
    } catch (error) {
        reply.code(500).send({ error: 'Failed to retrieve comment' });
    }
};

// Controller to get comments by report ID
const getCommentsByReportId = async (request, reply) => {
    const { id } = request.params;
    try {
        const comments = await commentService.getCommentsByReportId(id);    
        reply.send(comments);
    } catch (error) {
        reply.code(500).send({ error: 'Failed to retrieve comments by report ID' });
    }
};

// Controller to create a new comment
const createComment = async (request, reply) => {
    const data = request.body;
    try {
        const newComment = await commentService.createComment(data);
        reply.code(201).send(newComment);
    } catch (error) {
        reply.code(500).send({ error: 'Failed to create comment', details: error.message });
    }
};

// Controller to update a comment
const updateComment = async (request, reply) => {
    const { id } = request.params;
    const data = request.body;
    try {
        const updatedComment = await commentService.updateComment(id, data);
        if (updatedComment) {
            reply.send(updatedComment);
        } else {
            reply.code(404).send({ error: 'Comment not found' });
        }
    } catch (error) {
        reply.code(500).send({ error: 'Failed to update comment' });
    }
};

// Controller to delete a comment
const deleteComment = async (request, reply) => {
    const { id } = request.params;
    try {
        const deletedCount = await commentService.deleteComment(id);
        if (deletedCount) {
            reply.code(204).send(); // No content
        } else {
            reply.code(404).send({ error: 'Comment not found' });
        }
    } catch (error) {
        reply.code(500).send({ error: 'Failed to delete comment' });
    }
};

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    getCommentsByReportId
};