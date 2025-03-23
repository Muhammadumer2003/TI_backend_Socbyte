const AffectedProduct = require('./tI-report-a-p-model');
const db = require('../config/db');

// Get all affected products
const getAllAffectedProducts = async () => {
    return await AffectedProduct.getAll();
};

// Get affected product by ID
const getAffectedProductById = async (id) => {
    return await AffectedProduct.getById(id);
};

// Get affected products by Report ID
const getAffectedProductsByReportId = async (reportId) => {
    return await db('affected_products').where({ TId: reportId }); // Get affected products by report ID
};

// Create a new affected product
const createAffectedProduct = async (data) => {
    try {
        const [newProduct] = await db('affected_products').insert(data).returning('*'); // This returns an array
        return newProduct; // Return the first element of the array
    } catch (error) {
        console.error('Error creating affected product:', error); // Log the error for debugging
        throw new Error('Database error: ' + error.message);
    }
};

// Update an existing affected product
const updateAffectedProduct = async (id, data) => {
    return await AffectedProduct.update(id, data);
};

// Delete an affected product
const deleteAffectedProduct = async (id) => {
    return await AffectedProduct.delete(id);
};

module.exports = {
    getAllAffectedProducts,
    getAffectedProductById,
    getAffectedProductsByReportId,
    createAffectedProduct,
    updateAffectedProduct,
    deleteAffectedProduct
};