/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
import Newsletter from './newsletter.model';
var NewsletterEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
Newsletter.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Newsletter.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    NewsletterEvents.emit(`${event}:${doc._id}`, doc);
    NewsletterEvents.emit(event, doc);
  };
}

export default NewsletterEvents;
