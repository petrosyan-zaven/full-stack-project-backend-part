const db = require('../index').db;

async function singleUser({params:{ id }}, res) {
    db.get("SELECT * FROM users WHERE id=?", [id], (err, data) => {
      if(err){
        res.send(JSON.stringify({response:'Something went wrong'}));
      }
      res.send(data);
    });
  }


async function allUsersList( req, res ) {
    db.all("SELECT * FROM users", [], (err, data) => {

        if(err){
            res.send(JSON.stringify({response:'Something went wrong'}));
          }
          
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

module.exports = { singleUser, allUsersList, deleteUser, updateUser } 