const affectedProductController = require('./tI-report-a-p-controller');

module.exports = async function (fastify, options) {
    // Define routes
    fastify.get('/affected-products/all', affectedProductController.getAllAffectedProducts); // Get all affected products
    fastify.get('/affected-products/:id', affectedProductController.getAffectedProductById); // Get affected product by ID
    fastify.post('/affected-products', affectedProductController.createAffectedProduct); // Create a new affected product
    fastify.put('/affected-products/:id', affectedProductController.updateAffectedProduct); // Update an existing affected product
    fastify.delete('/affected-products/:id', affectedProductController.deleteAffectedProduct); // Delete an affected product
    fastify.get('/affected-products/report/:id', affectedProductController.getAffectedProductsByReportId); // Get affected products by report ID
};