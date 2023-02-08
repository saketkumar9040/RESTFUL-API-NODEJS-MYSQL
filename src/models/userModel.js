const pool=require('../../config/database');

module.exports={
    createUser:(data,callback)=>{
        pool.query(
            `insert into registeruser(firstName,lastName,gender,email,password,number)
             values(?,?,?,?,?,?)`,
             [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number
             ],
             (error,results,fields)=>{
                if(error){
                   return callback(error);
                }
                return callback(null,results)
             }
        );
    },

    getUsers:(callback)=>{
        pool.query(
            `select id,firstName,lastName,gender,email,number from registerUser`,
            [],
            (error,result,fields)=>{
                if(error){
                  return  callback(error);
                }
                return callback(null,result);
            }
        )
    },

    getUserById:(id,callback)=>{
        pool.query(
            `select id,firstName,lastName,gender,email,number from registerUser where id = ?`,
            [id],
            (error,result,fields)=>{
                if(error){
                  return  callback(error);
                }
                return callback(null,result[0]);
            }
        )
    },

    updateUser:(data,callback)=>{
        pool.query(
            `update registerUser set firstName=?,lastName=?,gender=?,email=?,password=?,number=? where id= ?`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error,result,fields)=>{
                if(error){
                  return  callback(error);
                }
                return callback(null,result);
            }
        )
    },

    deleteUser:(data,callback)=>{
        pool.query(
            `delete from registerUser where id=?`,
            [data.id],
            (error,result,fields)=>{
                if(error){
                  return  callback(error);
                }
                return callback(null,result[0]);
            }
        )
    },

    login:(email,callback)=>{
        pool.query(
            `select * from registerUser where email = ?`,
            [email],
            (error,result,fields)=>{
                if(error){
                  return  callback(error);
                }
                return callback(null,result[0]);
            }
        )
    },

};