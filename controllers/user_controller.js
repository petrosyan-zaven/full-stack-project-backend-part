const db = require('../index').db;
const generateAccessToken = require('../jwt/generate').generateAccessToken;
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
require('dotenv').config();



async function register( req, res ) {
    const username = req.body.username;
    const password = req.body.password;
    const hashed_password = CryptoJS.SHA256(password).toString();
    const sql = 'INSERT INTO users(username, password,role) VALUES (?,?,?)';
    db.run(sql, [username,hashed_password, 0],(err)=>{
        if(err){
            res.send(JSON.stringify( {status:'Error Reigstering'} ));
        }
            res.send(JSON.stringify( {status: 'User Created'} ));
    })
}



async function login( req, res ) {
    const username = req.body.username
    const password = req.body.password
    // const roles = req.body.role

    

    const hashed_password = CryptoJS.SHA256(password).toString();
    // console.log(token)
    const sql = "SELECT * from users WHERE username = ?"
    db.get(sql,[username], function(err, row){
        console.log(row);
        
      if(username == row.username && hashed_password == row.password) {
          let token = generateAccessToken(row.id, row.username, row.role)
          console.log(row.role, token);
          res.send(JSON.stringify( {status: "Logged in",jwt:token} ));
      }else {
          res.send(JSON.stringify( {status: "Wrong credentials"} ));
      }
    }) 
  }  



module.exports = { register, login }