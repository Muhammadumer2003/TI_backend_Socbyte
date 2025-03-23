require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const db = require('./config/db.js'); // Knex.js database connection
const reportRoutes = require('./t1_reports/tI-report.route.js');
const affectedProductRoutes = require('./tI-report-affected-products/tI-report-a-p-route.js');
const iocsRoutes = require('./tI-report-iocs/tI-report-IOCs.route.js');
const tisendRoutes=require("./tI-rerport_send/tI-report-send.route.js")
const {createTable}=require("./t1_reports/tI_report.model.js")
const {createTiReportSendTable}=require("./tI-rerport_send/tI-report-send.model.js")

// Create tables if not exists


const { createAffectedProductsTable } = require('./tI-report-affected-products/tI-report-a-p-model.js'); // Import the function
const sourceRoutes = require('./source/source.route.js');
const { createSourceTable } = require('./source/source.model.js');
const { createIOCsTable } = require('./tI-report-iocs/tI-report-IOCs.model.js');



const commentRoutes = require('./tI-report-comments/tI-report-comment.route.js');
const cveRoutes = require('./tI-report-cves/tI-report-cves.route.js');

// const { createIOCSTable } = require('./tI-report-iocs/tI-report-IOCs.model.js');


// Middleware
// fastify.register(require('@fastify/cors'));
fastify.register(require('@fastify/formbody'));
fastify.register(reportRoutes);
fastify.register(commentRoutes);
fastify.register(cveRoutes);
fastify.register(affectedProductRoutes);
fastify.register(sourceRoutes);
fastify.register(iocsRoutes);
fastify.register(tisendRoutes);

// fastify.register(require('./t1/route')); // Uncomment when routes are available

// Import the CORS plugin
fastify.register(require('@fastify/cors'), {
  origin: '*', // Allow all origins (not recommended for production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
});

const start = async () => {
  try {
    // Check database connection before starting the server
    // await createTable(); // Ensure the table is created before starting the server
    // await createCommentTable(); // Ensure the table is created before starting the server
    // await createCVESTable();
    // await createIOCSTable();
    // await createAffectedProductsTable(); // Ensure the table is created before starting the server
    // await createSourceTable(); // Ensure the table is created before starting the server
    // await createIOCsTable();
    // await createTiReportSendTable(); // Ensure the table is created before starting the server

   
    await db.raw('SELECT 1'); 
    console.log('✅ PostgreSQL Database Connected Successfully');

    

    await fastify.listen({ 
      port: process.env.WEB_SERVER_PORT || 3200, 
      host: '0.0.0.0' 
    });
    console.log('🚀 Server running...');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
