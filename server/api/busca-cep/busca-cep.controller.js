/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/busca-cep/:id              ->  index
 */
'use strict';
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
  requestify.get(`http://apps.widenet.com.br/busca-cep/api/cep/${req.params.id}.json`)
    .then(respondWithResult(res, res.code));
}
