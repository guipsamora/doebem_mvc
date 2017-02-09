/**
 * Ongs model events
 */

'use strict';

import {EventEmitter} from 'events';
import Ong from './ong.model';

var OngEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
OngEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Ong.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    OngEvents.emit(`${event}:${doc._id}`, doc);
    OngEvents.emit(event, doc);
  };
}

export default OngEvents;
