const db = require('../config/db.js');

// Function to create the affected_products table
const createAffectedProductsTable = async () => {
    const exists = await db.schema.hasTable('affected_products');
    if (!exists) {
        await db.schema.createTable('affected_products', (table) => {
            table.increments('id').primary(); // Primary key
            table.integer('TId').unsigned().references('ref_id').inTable('ti_report'); // Foreign key referencing ti_report
            table.string('product').notNullable(); // Product name
            table.timestamps(true, true); // Created at and updated at timestamps
        });
    }
};

// Define the AffectedProduct model
const AffectedProduct = {
    create: async (data) => {
        try {
            const [newProduct] = await db('affected_products').insert(data).returning('*'); // This returns an array
            return newProduct; // Return the first element of the array
        } catch (error) {
            console.error('Error creating affected product:', error); // Log the error for debugging
            throw new Error('Database error: ' + error.message);
        }
    },
    getAll: async () => {
        return await db('affected_products').select('*'); // Get all affected products
    },
    getById: async (id) => {
        return await db('affected_products').where({ id }).first(); // Get affected product by ID
    },
    getByReportId: async (reportId) => {
        return await db('affected_products').where({ TId: reportId }); // Get affected products by report ID
    },
    update: async (id, data) => {
        try {
            const [updatedProduct] = await db('affected_products').where({ id }).update(data).returning('*');
            return updatedProduct; // Return the updated product
        } catch (error) {
            console.error('Error updating affected product:', error); // Log the error for debugging
            throw new Error('Database error: ' + error.message);
        }
    },
    delete: async (id) => {
        try {
            return await db('affected_products').where({ id }).del(); // Delete affected product by ID
        } catch (error) {
            console.error('Error deleting affected product:', error); // Log the error for debugging
            throw new Error('Database error: ' + error.message);
        }
    }
};

// Export the functions and model
module.exports = {
    createAffectedProductsTable,
    AffectedProduct
}; 