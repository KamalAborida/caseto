const User = require('../models/user.model');

exports.find = async (filterObject) => {
    try {
        const user = await User.findOne({ where: filterObject });

        if (!user) {
            return {
                success: false,
                messageCode: '0005',
                error: {
                    user: 'No Matching Result Found.',
                },
                code: 400
            };
        }

        return {
            success: true,
            user: user,
            code: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            messageCode: '0008',
            error: 'Error Occurred, Please try again later.',
            code: 500
        };
    }
}

//////////////////////////////////////////////////////////////////////////////

exports.get = async (filterObject, selectionObject) => {
    try {
        let user = await User.findOne({
            where: filterObject,
            attributes: { exclude: ['salt', 'hash'], ...selectionObject },
        });


        if (!user) {
            return {
                success: false,
                messageCode: '0005',
                error: {
                    user: 'No Matching Result Found.',
                },
                code: 400
            };
        }

        return {
            success: true,
            user: user,
            code: 200
        };

    } catch (error) {
        console.error(error);
        return {
            success: false,
            messageCode: '0008',
            error: 'Error Occurred, Please try again later.',
            code: 500
        };
    }
}

//////////////////////////////////////////////////////////////////////////////

exports.list = async (filterObject, selectionObject, pageNumber, limitNumber) => {
    try {
        delete filterObject.page;
        delete filterObject.limit;
        const offset = (pageNumber - 1) * limitNumber

        const { count, rows: users } = await User.findAndCountAll({
            where: filterObject,
            attributes: { exclude: ['salt', 'hash'], ...selectionObject },
            limit: limitNumber,
            offset: offset
        });

        return {
            success: true,
            count: count,
            users: users,
            code: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            messageCode: '0008',
            error: 'Error Occurred, Please try again later.',
            code: 500
        };
    }
};

//////////////////////////////////////////////////////////////////////////////

exports.create = async (formObject) => {
    try {
        let isUnique = await this.isObjectUnique(formObject);
        if (!isUnique.success) return isUnique;

        const passwordValidation = await this.validatePasswords(formObject);
        if (!passwordValidation.success) return passwordValidation

        formObject.salt = null
        formObject.hash = formObject.password
        delete formObject.password
        delete formObject.confirmPassword
        delete formObject.branchIds;
        delete formObject.brandIds;
        delete formObject.isDefault;
        formObject.isDefault = false;

        let user = await User.create(formObject);
        delete user.dataValues.salt;
        delete user.dataValues.hash;

        return {
            success: true,
            user: user,
            code: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            messageCode: '0008',
            error: 'Error Occurred, Please try again later.',
            code: 500
        };
    }
}

//////////////////////////////////////////////////////////////////////////////

exports.update = async (id, formObject) => {
    try {

        let user = await this.find({ id: id });
        if (!user.success) {
            return user
        }
        
        if (user.user.isDefault) {
            return {
                success: false,
                messageCode: '0009',
                error: {
                    user: 'Default User cannot be updated.',
                },
                code: 400
            }
        }

        await User.update(formObject, { where: { id: id } });

        const userUpdated = await this.get({ id: id }, {});

        return {
            success: true,
            user: userUpdated.user,
            code: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            messageCode: '0008',
            error: 'Error Occurred, Please try again later.',
            code: 500
        };
    }
}

//////////////////////////////////////////////////////////////////////////////

exports.remove = async (id) => {
    try {
        const existingObject = await this.find({ id: id });
        if (!existingObject.success) return existingObject;

        if (existingObject.user.isDefault) {
            return {
                success: false,
                messageCode: '0010',
                error: 'Default user cannot be deleted.',
                code: 400
            };
        }

        await User.destroy({ where: { id: id } });

        return {
            success: true,
            messageCode: '0011',
            message: {
                user: 'Deleted successfully.'
            },
            code: 200
        };
    } catch (error) {
        console.error(error.message);
        return {
            success: false,
            messageCode: '0008',
            error: 'Error Occurred, Please try again later.',
            code: 500
        };
    }
};

//////////////////////////////////////////////////////////////////////////////

exports.isObjectUnique = async (formObject) => {
    const duplicateObject = await this.find({
        emailAddress: formObject.emailAddress
    })

    if (duplicateObject.success) {

        if (duplicateObject.user.emailAddress == formObject.emailAddress) return {
            success: false,
            messageCode: '0006',
            error: "This emailAddress is Already Used.",
            code: 409
        }
    }

    return {
        success: true,
        code: 200
    }
}


////////////////////////////////////////////////////////////////////////////////

exports.validatePasswords = async (formObject) => {
    if (formObject.password !== formObject.confirmPassword) {
        return {
            success: false,
            messageCode: '0007',
            error: 'Passwords do not match',
            code: 400
        };
    }

    return {
        success: true,
        code: 200,
    }
}

////////////////////////////////////////////////////////////////////////////////

exports.count = async (filterObject) => {
    try {
        const count = await User.count({ where: filterObject });
        return {
            success: true,
            count: count,
            code: 200
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            messageCode: '0008',
            error: 'Error Occurred, Please try again later.',
            code: 500
        };
    }
}