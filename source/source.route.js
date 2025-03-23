const sourceController = require('./source.controller');

module.exports = async (fastify, options) => {
    // Route to get all sources
    fastify.get('/sources/getall', sourceController.getAllSources);

    // Route to get a source by ID
    fastify.get('/sources/:id', sourceController.getSourceById);

    // Route to create a new source
    fastify.post('/sources', sourceController.createSource);

    // Route to update a source
    fastify.put('/sources/:id', sourceController.updateSource);

    // Route to delete a source
    fastify.delete('/sources/:id', sourceController.deleteSource);
};
