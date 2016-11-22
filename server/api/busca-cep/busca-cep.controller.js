/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/busca-cep/:id              ->  index
 */
'use strict';
import jsonpatch from 'fast-json-patch';
import http from 'http';
var express = require('express');
var app = express();


// Gets a add frm a cep
export function show(req, res) {
  var options = {
    host: 'apps.widenet.com.br',
    port: 80,
    path: `/busca-cep/api/cep/${req.params.id}.json`
  }
  console.log(options);
  app.get(options, (req, res) => {
      console.log(res)
  }
   
  )}

