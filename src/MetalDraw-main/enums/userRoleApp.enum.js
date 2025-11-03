const userRoleAppEnum = {
    SUPER_ADMIN: 'superAdmin',
    EDITOR: 'editor',
    VIEWER: 'viewer',
};


const userRoleAppIndex = {
    0: userRoleAppEnum.SUPER_ADMIN,
    1: userRoleAppEnum.EDITOR,
    2: userRoleAppEnum.VIEWER
};



module.exports = {
    userRoleAppEnum,
    userRoleAppIndex
};