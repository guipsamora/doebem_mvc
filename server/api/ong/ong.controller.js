/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/ong              ->  index
 * POST    /api/ong              ->  create
 * GET     /api/ong/:id          ->  show
 * PUT     /api/ong/:id          ->  upsert
 * PATCH   /api/ong/:id          ->  patch
 * DELETE  /api/ong/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Ong from './ong.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Ong
export function index(req, res) {
  return Ong.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a single Ong from the DB from id or from slug...
export function show(req, res) {
  return Ong.findOne({slug: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(err => {
      handleError(err);
    });
}

// Creates a new Ong in the DB
export function create(req, res) {
  return Ong.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(error => {
      console.log('create na API da ong', error);
      return handleError(res);
    });
}

// Upserts the given Thing in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Ong.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Ong in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Ong.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Ong from the DB
export function destroy(req, res) {
  return Ong.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
