const AffectedProductService = require('./tI-report-service');

// Get all affected products
const getAllAffectedProducts = async (request, reply) => {
    try {
        const products = await AffectedProductService.getAllAffectedProducts();
        reply.send(products);
    } catch (error) {
        reply.status(500).send({ error: 'Failed to fetch affected products' });
    }
};

// Get affected product by ID
const getAffectedProductById = async (request, reply) => {
    try {
        const product = await AffectedProductService.getAffectedProductById(request.params.id);
        if (product) {
            reply.send(product);
        } else {
            reply.status(404).send({ error: 'Affected product not found' });
        }
    } catch (error) {
        reply.status(500).send({ error: 'Failed to fetch affected product' });
    }
};

// Get affected products by Report ID
const getAffectedProductsByReportId = async (request, reply) => {
    try {
        const products = await AffectedProductService.getAffectedProductsByReportId(request.params.id);
        reply.send(products);
    } catch (error) {
        reply.status(500).send({ error: 'Failed to fetch affected products by report ID' });
    }
};

// Create a new affected product
const createAffectedProduct = async (request, reply) => {
    try {
        const newProduct = await AffectedProductService.createAffectedProduct(request.body);
        reply.status(201).send(newProduct);
    } catch (error) {
        reply.status(500).send({ error: 'Failed to create affected product: ' + error.message });
    }
};

// Update an existing affected product
const updateAffectedProduct = async (request, reply) => {
    try {
        const updatedProduct = await AffectedProductService.updateAffectedProduct(request.params.id, request.body);
        if (updatedProduct) {
            reply.send(updatedProduct);
        } else {
            reply.status(404).send({ error: 'Affected product not found' });
        }
    } catch (error) {
        reply.status(500).send({ error: 'Failed to update affected product' });
    }
};

// Delete an affected product
const deleteAffectedProduct = async (request, reply) => {
    try {
        const deleted = await AffectedProductService.deleteAffectedProduct(request.params.id);
        if (deleted) {
            reply.status(204).send(); // No content to send back
        } else {
            reply.status(404).send({ error: 'Affected product not found' });
        }
    } catch (error) {
        reply.status(500).send({ error: 'Failed to delete affected product' });
    }
};

// Export the controller methods
module.exports = {
    getAllAffectedProducts,
    getAffectedProductById,
    createAffectedProduct,
    updateAffectedProduct,
    deleteAffectedProduct,
    getAffectedProductsByReportId
};