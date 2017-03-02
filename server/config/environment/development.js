'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================

module.exports = {

  // MongoDB connection options

  mongo: {
    uri: 'mongodb://localhost:27017/doebemorg-dev',
    // uri: 'mongodb://gsamora:Db140208@ds133279.mlab.com:33279/heroku_01j1ss8r'
  },
  // Seed database on startup
  seedDB: true

};
