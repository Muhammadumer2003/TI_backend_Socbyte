const SourceService = require('./source.model'); // Adjust the path as necessary

// Get all sources
const getAllSources = async (request, reply) => {
    try {
        const sources = await SourceService.getAllSources();
        reply.send(sources);
    } catch (error) {
        reply.status(500).send({ error: 'Failed to fetch sources' });
    }
};

// Get a source by ID
const getSourceById = async (request, reply) => {
    try {
        const source = await SourceService.getSourceById(request.params.id);
        if (source) {
            reply.send(source);
        } else {
            reply.status(404).send({ error: 'Source not found' });
        }
    } catch (error) {
        reply.status(500).send({ error: 'Failed to fetch source' });
    }
};

// Create a new source
const createSource = async (request, reply) => {
    try {
        const newSource = await SourceService.createSource(request.body);
        reply.status(201).send(newSource);
    } catch (error) {
        reply.status(500).send({ error: 'Failed to create source: ' + error.message });
    }
};

// Update an existing source
const updateSource = async (request, reply) => {
    try {
        const updatedSource = await SourceService.updateSource(request.params.id, request.body);
        if (updatedSource) {
            reply.send(updatedSource);
        } else {
            reply.status(404).send({ error: 'Source not found' });
        }
    } catch (error) {
        reply.status(500).send({ error: 'Failed to update source' });
    }
};

// Delete a source
const deleteSource = async (request, reply) => {
    try {
        const deleted = await SourceService.deleteSource(request.params.id);
        if (deleted) {
            reply.status(204).send(); // No content to send back
        } else {
            reply.status(404).send({ error: 'Source not found' });
        }
    } catch (error) {
        reply.status(500).send({ error: 'Failed to delete source' });
    }
};

// Export the controller methods
module.exports = {
    getAllSources,
    getSourceById,
    createSource,
    updateSource,
    deleteSource,
};
