/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/busca-cep/:id              ->  index
 */
'use strict';
import jsonpatch from 'fast-json-patch';
import requestify from 'requestify';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}


// Gets a cep
export function show(req, res) {
  var options = {
    host: 'apps.widenet.com.br',
    port: 80,
    path: `/busca-cep/api/cep/${req.params.id}.json`
  }
  console.log(req.params.id);

  requestify.get(`http://apps.widenet.com.br/busca-cep/api/cep/${req.params.id}.json`)
    //.then(res => response.getBody)
    .then(respondWithResult(res, res.code))
   
}

