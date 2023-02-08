const {createUser,getUserById,getUsers,updateUser,deleteUser,login}=require('../models/userModel');
const {genSaltSync,hashSync, compareSync}=require('bcrypt');
const {sign}=require('jsonwebtoken');
require('dotenv').config();

module.exports={
    createUser:(req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt);
        createUser(body,(error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).send({status:false,message:"database connection error"});
            }

            return res.status(201).send({
                status:true,
                data:result
        });
        });
    },

    getUserById:(req,res)=>{
        const id=req.params.id;
        getUserById(id,(error,result)=>{
            if(error){
                console.log(error);
                return;
            }
            if(!result){
                return res.status(404).send({status:false,message:"Record Not Found"});
            }
            return res.status(200).send({status:true,data:result});

        });
    },

    getUsers:(req,res)=>{
        getUsers((error,result)=>{
            if(error){
                console.log(error);
                return;
            }
            if(!result){
                return res.status(404).send({status:false,message:"Record Not Found"});
            }
            return res.status(200).send({status:true,data:result});

        });
    },

    updateUser:(req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt);
        updateUser(body,(error,result)=>{
            if(error){
                console.log(error);
                return;
            }
            return res.status(200).send({status:true,data:result});

        });
    },

    deleteUser:(req,res)=>{
        const body=req.body;
        deleteUser(body,(error,result)=>{
            if(error){
                console.log(error);
                return;
            }
            if(!result){
                return res.status(404).send({status:false,message:"no such user exists"})
            }
            console.log(result);
            return res.status(200).send({status:true,message:"user deleted successfully"});

        });
    },

    login:(req,res)=>{
        const body=req.body;
        login(body.email,(error,result)=>{
            if(error){
                console.log(error);
                return;
            }
            if(!result){
                return res.status(404).send({status:false,message:"invalid email or password"});
            }
            const comparePassword=compareSync(body.password,result.password);
            if(result){
                result.password=undefined;
                const jwt=sign({result:result},process.env.SECRET_KEY,{expiresIn:"1hr"});
                return res.status(200).send({status:true,token:jwt});
            }else{
                return res.status(500).send({status:false,message:"invalid email password"})
            }

        });
    }

};