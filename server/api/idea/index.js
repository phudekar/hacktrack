'use strict';

var express = require('express');
var controller = require('./idea.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/myideas',auth.isAuthenticated(), controller.myideas);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(),controller.create);
router.post('/like/:id', auth.isAuthenticated(),controller.like);
router.put('/:id', auth.isAuthenticated(),controller.update);
router.patch('/:id', auth.isAuthenticated(),controller.update);
router.delete('/:id', auth.isAuthenticated(),controller.destroy);

module.exports = router;