const db = require('../config/db.js'); // Adjust the path as necessary

// Function to create the source table
const createSourceTable = async () => {
    const exists = await db.schema.hasTable('source');
    if (!exists) {
        await db.schema.createTable('source', (table) => {
            table.increments('id').primary(); // Primary key
            table.string('sourcename').notNullable(); // Source name
            table.timestamps(true, true); // Created at and updated at timestamps
        });
    }
};

// Function to create a new source
const createSource = async (data) => {
    const [newSource] = await db('source').insert(data).returning('*');
    return newSource;
};

// Function to get all sources
const getAllSources = async () => {
    return await db('source').select('*');
};

// Function to get a source by ID
const getSourceById = async (id) => {
    return await db('source').where({ id }).first();
};

// Function to update a source
const updateSource = async (id, data) => {
    const [updatedSource] = await db('source').where({ id }).update(data).returning('*');
    return updatedSource;
};

// Function to delete a source
const deleteSource = async (id) => {
    return await db('source').where({ id }).del();
};

// Call the function to create the table
createSourceTable();

// Export the model functions
module.exports = {
    createSourceTable,
    createSource,
    getAllSources,
    getSourceById,
    updateSource,
    deleteSource,
};
