const { body } = require('express-validator');

const photoInsertValidation = () => {
    return [
        body('title')
            .not()
            .equals('undefined')
            .withMessage('O título é obrigatório')
            .isString()
            .withMessage('O campo título é obrigatório')
            .isLength({ min: 3 })
            .withMessage(
                'O nome precisa ter no mín: 3 caracteres.'
            ),
        body('image').custom((value, { req }) => {
            if (!req.file) {
                throw new Error(
                    'A imagem é obrigatória'
                );
            }
            return true;
        })
    ];
};


module.exports = {
    photoInsertValidation,
};