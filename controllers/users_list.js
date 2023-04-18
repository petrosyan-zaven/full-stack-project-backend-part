const db = require('../index').db;


async function allUsersList( req, res ) {
    db.all("SELECT * FROM users", [], (err, data) => {
        res.send(data);
      });
}

async function updateUser ( req, res ) {

    db.run('UPDATE users SET username=?, role=?, WHERE id=?', 
    [
        req.body.username,
        req.body.role,
        req.params.id,
        
    ],
    (err)=>{
        if(err){
            res.send(JSON.stringify( {response:'Something went wrong'} ));
        }
        res.send(JSON.stringify( {response:'User Updated'} ));
    }
    )
}


async function deleteUser( req, res ) {
    db.run('DELETE FROM users WHERE id=?', [req.params.id],
    (err)=>{
        if(err){
            res.send(JSON.stringify( {response:'Something went wrong'} ));
        }
        res.send(JSON.stringify( {response:'User Deleted'} ));
    }
    )
    
}

module.exports = { allUsersList, deleteUser, updateUser } 