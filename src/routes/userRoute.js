const router=require('express').Router();

const {createUser,updateUser,getUserById,getUsers,deleteUser,login}=require('../controllers/userController');

router.post('/create',createUser);
router.get('/get',getUsers);
router.get('/getById/:id',getUserById);
router.put('/update',updateUser);
router.delete('/delete',deleteUser);
router.post('/login',login);

module.exports=router;