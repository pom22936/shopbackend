const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const {body} = require('express-validator')
const passportJWT =require('../middlewares/passportJWT')

/* localhost:3000/api/users/register */
router.post('/register',
body('name').not().isEmpty().withMessage('please input name'),
body('email').not().isEmpty().withMessage('Please input Email').isEmail().withMessage('Wrong format Email'),
body('password').not().isEmpty().withMessage('Please input password').isLength({ min: 3}).withMessage('Password is morn then 3 charecter'),
userController.register
)

router.post('/login', userController.login);

router.get('/me',passportJWT.isLogin,userController.me)

module.exports = router;
