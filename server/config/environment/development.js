'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost:27017/doebemorg-dev'
  },

  // Seed database on startup
  seedDB: true

};
