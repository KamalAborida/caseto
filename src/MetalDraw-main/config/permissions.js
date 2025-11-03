const { expressjwt: jwt } = require("express-jwt");
const { UnauthorizedError } = require('express-jwt');
const User = require('../models/user.model');
const { userRoleAppEnum } = require("../enums/userRoleApp.enum");

async function isTokenRevoked(payload) {
    try {
        const record = await User.findOne({ where: { id: payload.id }, raw: true });

        if (!record) {
            return true;
        }

        if (record.roleApp !== payload.roleApp) {
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error checking token revocation:', error);
        return true;
    }
}

function RevokedCallback(req, tokenPayload, done) {
    const payload = tokenPayload.payload;

    req.payload = payload;

    const isRevoked = isTokenRevoked(payload);

    return isRevoked;
}

function checkToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ success: false, messageCode: '0035', error: 'Authorization token is missing', code: 401 });
    }
    next();
}

function errorHandler(err, req, res, next) {
    if (err instanceof UnauthorizedError) {
        return res.status(401).json({
            success: false,
            messageCode: '0036',
            error: 'Unauthorized access - invalid or revoked token',
            code: 401
        });
    }

    console.error('Unexpected error occurred:', err);

    res.status(500).json({
        success: false,
        messageCode: '0008',
        error: 'Error Occurred, Please try again later.',
        code: 500
    });
}

const generateJwtMiddleware = (required = true) => jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: required,
    isRevoked: RevokedCallback,
});

const generateJwtMiddlewareOptional = () => jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false,
    isRevoked: (req, tokenPayload, done) => {
        if (!req.headers.authorization) {
            return false;
        }
        return RevokedCallback(req, tokenPayload, done);
    },
});


const checkPermissions = (permissions) => async (req, res, next) => {
    const auth = req.auth || {};

    if (auth.roleApp === userRoleAppEnum.SUPER_ADMIN) {
        return next();
    }

    const record = await User.findOne({
        where: { id: auth.id },
    });

    if (!record) {
        return res.status(403).json({
            code: 403,
            messageCode: '0034',
            error: 'You are not authorized!',
            success: false,
        });
    }

    if (!permissions.includes(record.roleApp)) {
        return res.status(403).json({
            code: 403,
            messageCode: '0034',
            error: 'You are not authorized!',
            success: false,
        });
    }
    let endpoint = req.originalUrl;

    if (endpoint.includes('?')) {
        endpoint = endpoint.split('?')[0];
    }

    endpoint = endpoint.split('v1')[1];

    return next();
};




module.exports = {
    checkToken,

    viewerAccess: [
        generateJwtMiddleware(true),
        checkPermissions([userRoleAppEnum.VIEWER, userRoleAppEnum.EDITOR, userRoleAppEnum.SUPER_ADMIN]),
    ],

    editorAccess: [
        generateJwtMiddleware(true),
        checkPermissions([userRoleAppEnum.EDITOR, userRoleAppEnum.SUPER_ADMIN]),
    ],

    superAdminAccess: [
        generateJwtMiddleware(true),
        checkPermissions([userRoleAppEnum.SUPER_ADMIN]),
    ],

    errorHandler,
};
