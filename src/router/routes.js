'use strict';

const express = require('express');
const router = express.Router();
const dataModules = require('../models/index');
const basicAuth = require('../auth/middlewares/basic');
const bearerAuth = require('../auth/middlewares/bearer');
const permissions = require('../auth/middlewares/acl');

const {
    homePage,
    //API
    handleGetAll,
    handleGetOne,
    handleCreate,
    handleUpdate,
    handleDelete,
    //AUTH
    handleSignup,
    handleSignin,
    handleGetUsers,
    handleSecret
} = require('./routes-functions');


router.get('/', homePage);
router.post('/signup', handleSignup);
router.post('/signin', basicAuth, handleSignin);
router.get('/users', bearerAuth, permissions('delete'), handleGetUsers);
router.get('/secret', bearerAuth, handleSecret);


router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    console.log({dataModules});
    next();
  } else {
    next('Invalid Model');
  }
});



//API routes
router.get('/:model',bearerAuth, handleGetAll);
router.get('/:model/:id',bearerAuth, handleGetOne);
router.post('/:model',bearerAuth, permissions('read'), handleCreate);
router.put('/:model/:id',bearerAuth, permissions('update'), handleUpdate);
router.delete('/:model/:id',bearerAuth, permissions('delete'), handleDelete);

module.exports = router;