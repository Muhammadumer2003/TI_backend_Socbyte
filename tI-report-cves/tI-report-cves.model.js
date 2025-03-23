const db = require('../config/db.js');

const createCVESTable = async () => {
    const exists = await db.schema.hasTable('cves');
    if (!exists) {
        await db.schema.createTable('cves', (table) => {
            table.increments('id').primary(); // Primary key
            table.integer('TIid').unsigned().references('ref_id').inTable('ti_report'); // Foreign key referencing ti_report
            table.float('cvss'); // CVSS score
            table.text('patchInfo'); // Information about patches
            table.text('description'); // Description of the CVE
            table.timestamps(true, true); // Created at and updated at timestamps
        });
    }
};

// Call the function to create the table
createCVESTable();

const countAll = async () => {
    const result = await db('cves').count('* as count').first(); // Count the total number of CVEs
    console.log('Count result:', result); // Log the result for debugging
    return result.count; // Return the count
};

const CVE = {
    create: async (data) => {
        try {
            const newCVE = await db('cves').insert(data).returning('*'); // This returns an array
            return newCVE[0]; // Return the first element of the array
        } catch (error) {
            console.error('Error creating CVE:', error); // Log the error for debugging
            throw new Error('Database error: ' + error.message);
        }
    },
    getByReportId: async (reportId) => {
        console.log('Fetching CVEs for report ID:', reportId); // Log the report ID
        const cves = await db('cves').where({ TIid: reportId });
        console.log('CVEs fetched:', cves); // Log the fetched CVEs
        return cves;
    },
    count: countAll,
};

module.exports = CVE;