/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
import Pagarme from './Pagarme.model';
var PagarmeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
Pagarme.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Pagarme.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PagarmeEvents.emit(`${event}:${doc._id}`, doc);
    PagarmeEvents.emit(event, doc);
  };
}

export default PagarmeEvents;
