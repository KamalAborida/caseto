const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/user.controller');
const jwtPermissions = require('../../config/permissions');
const { createUserValidation, updateUserValidation, removeUserValidation, listUsersValidation, getUserValidation } = require('../../validation/user.validation');
const validator = require('../../helpers/validation.helper');


router.route('/create').post(jwtPermissions.superAdminAccess, validator(createUserValidation), userController.createUser);
router.route('/get').get(jwtPermissions.superAdminAccess, validator(getUserValidation), userController.getUser);
router.route('/list').get(jwtPermissions.superAdminAccess, validator(listUsersValidation), userController.listUsers);
router.route('/update').put(jwtPermissions.superAdminAccess, validator(updateUserValidation), userController.updateUser);
router.route('/remove').delete(jwtPermissions.superAdminAccess, validator(removeUserValidation), userController.removeUser);


module.exports = router;