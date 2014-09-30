/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var idea = require('./idea.model');

exports.register = function(socket) {
  idea.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  idea.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('ideas:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('ideas:remove', doc);
}