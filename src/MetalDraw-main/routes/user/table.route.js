const express = require('express');
const router = express.Router();
const tableController = require('../../controllers/user/tableDatabase.controller');
const jwtPermissions = require('../../config/permissions');
const {listTableColumnsValidation, listTablesValidation } = require('../../validation/tables.validation');
const validator = require('../../helpers/validation.helper');

router.route('/list').get(jwtPermissions.viewerAccess, validator(listTablesValidation), tableController.listTables);
router.route('/listColumns').get(jwtPermissions.viewerAccess, validator(listTableColumnsValidation), tableController.listTableColumns);

module.exports = router;