const request = require("request");

module.exports = (app, db) => {
    app.post("/feedback/bugreport/" , (req, res) => {
        db.getConnection((error, connection) => {
            if (error) res.json(error);
            else {
                const params ={
                    bugtype : req.body.title,
                    bugmessage : req.body.body
                }
                
                connection.query(`INSERT INTO bugreport ( bugType ,bugMessage ) VALUES ('${params.bugtype}' , '${params.bugmessage}')` , (err, result) => {
                    connection.release();
                    if(!err) {
                        res.send(result);
                    } else {
                        throw err;
                    }
                })
            }
        })
    }) 

    app.get('/feedback/pendingBug') , (req , res) => {
        db.getConnection((error ,  connection) => {
            if (error ) res.json(error); 
            else{
                connection.query(`SELECT * FROM bugreport WHERE status=1`)
            }
        })
    }
}