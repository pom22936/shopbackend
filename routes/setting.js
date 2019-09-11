const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController')

//localhost/api/setting
router.get('/', settingController.index)

module.exports = router
