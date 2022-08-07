const express = require('express');

const router = express.Router();
const articleController = require('../controllers/articleController');

router.get('/all', articleController.getAll);

router.post('/', articleController.save);

module.exports = router;
