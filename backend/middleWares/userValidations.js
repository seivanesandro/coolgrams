const { body } = require("express-validator");

const userCreateValidation = () => {
    return [
        body('name')
            .isString()
            .withMessage('O nome é obrigatório')
            .isLength({ min: 3 })
            .withMessage(
                'O nome precisa de ter no minimo: 3 caracteres'
            ),
        body('email')
            .isString()
            .withMessage('O e-mail é obrigatorio')
            .isEmail()
            .withMessage(
                'Insira um email valido!'
            ),
        body('password')
            .isString()
            .withMessage(
                'A Password é obrigatorio'
            )
            .isLength({ min: 6 })
            .withMessage(
                'A Password precisa de ter no minimo: 6 caracteres.'
            )
            .isLength({ max: 12 })
            .withMessage(
                'A Password precisa de ter no maximo: 12 caracteres.'
            ),
        body('confirmPassword')
            .isString()
            .withMessage(
                'A Confirmação da Password é obrigatória'
            )
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error(
                        'As passwords estão diferentes'
                    );
                }
                return true;
            }),
    ];
};

//validate login
const loginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("O e-mail é obrigatorio")
            .isEmail()
            .withMessage("Insira um e-mail valido."),
        body("password")
            .isString()
            .withMessage("A password é obrigatoria")
    ]
}

const userUpdateValidation = () => {

    return [
        body('name')
            .optional()
            .isLength({ min: 3 })
            .withMessage(
                'O nome precisa de ter no minimo: 3 caracteres'
            ),
        body('password')
            .optional()
            .isLength({ min: 6 })
            .withMessage(
                'A Password precisa de ter no minimo: 6 caracteres.'
            )
    ];
}

module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation,
};