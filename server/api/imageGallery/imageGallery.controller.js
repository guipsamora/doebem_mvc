/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/imageGallery              ->  index
 * POST    /api/imageGallery              ->  create
 * GET     /api/imageGallery/:id          ->  show
 * DELETE  /api/imageGallery/:id          ->  destroy
 */

'use strict';
import AWS from 'aws-sdk';
import crypto from 'crypto';
import moment from 'moment';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});
var s3 = new AWS.S3();
var params = {
  Bucket: 'doebem'
};
var s3Url = 'https://s3-sa-east-1.amazonaws.com/doebem';

exports.signing = function(req, res) {
  var request = req.body;
  var fileName = request.filename;
  var path = fileName;

  var readType = 'public-read';

  var expiration = moment().add(5, 'm')
    .toDate(); //15 minutes

  var s3Policy = {
    expiration,
    conditions: [{
      bucket: 'doebem'
    },
      ['starts-with', '$key', path],
    {
      acl: readType
    },
    {
      success_action_status: '201'
    },
      ['starts-with', '$Content-Type', request.type],
      ['content-length-range', 2048, 10485760], //min and max
    ]
  };

  var stringPolicy = JSON.stringify(s3Policy);
  var base64Policy = new Buffer(stringPolicy, 'utf-8').toString('base64');

  // sign policy
  var signature = crypto.createHmac('sha1', process.env.AWS_SECRET_ACCESS_KEY)
    .update(new Buffer(base64Policy, 'utf-8'))
    .digest('base64');

  var credentials = {
    url: s3Url,
    fields: {
      key: path,
      AWSAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      acl: readType,
      policy: base64Policy,
      signature,
      'Content-Type': request.type,
      success_action_status: 201
    }
  };
  res.jsonp(credentials);
};

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of images
export function index(req, res) {
  return s3.listObjects(params).promise()
    .then(data => {
      let images = [];
      data.Contents.map(image => {
        images.push(image.Key);
      });
      return res.status(200).json(images);
    })
    .catch(err => {
      console.log(err);
      return handleError(res);
    });
}

// Gets a single Posts from the DB
export function show(req, res) {
  /*return Posts.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));*/
}

// Deletes a image from the s3
export function destroy(req, res) {
  let paramsToDelete = {
    Bucket: 'doebem',
    Key: req.params.id
  };
  s3.deleteObject(paramsToDelete).promise()
    .then(result => {
      console.log(result);
      return res.status(200);
    })
    .catch(err => {
      console.log(err);
      return handleError(res);
    });
}
