const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateJWT = require("./authenticateJWT");
const saltRounds = 10;

module.exports = (app, db) => {
    app.post("/login", (req, res) => {
        db.getConnection((err, connection) => {
            if(err) throw err;

            const params = {
                email : req.body.email,
                username : req.body.username,
                password : req.body.password,
            };

            connection.query('SELECT * FROM users WHERE email = ? AND username = ?', [params.email, params.username], (err, result) => {
                connection.release();

                if(!err) {
                    if(result.length > 0) {
                        bcrypt.compare(params.password, result[0].password, (err, response) => {
                            if(response) {
                                const accessToken = jwt.sign({id: result[0].id, username: result[0].username, role: result[0].role}, process.env.BCRYPT_SECRET);
                                res.json({error : false, message : "Connexion réussie.", accessToken});
                            } else {
                                res.json({error: true, message : "Mot de passe incorrect."})
                            }
                        })
                    } else {
                        res.json({error: true, message: "Cet utilisateur n'existe pas."})
                    }
                } else {
                    console.log(err);
                }
            })
        })
    })

    app.post("/register", (req,res) => {
        db.getConnection((err, connection) => {
            if(err) throw err;

            const params = {
                email : req.body.email,
                username : req.body.username,
                password : req.body.password,
                fullName : req.body.fullName,
                role : req.body.role
            };

            bcrypt.hash(params.password, saltRounds, (err, hash) => {
                if(err) {
                    console.log(err);
                } else {
                    params.password = hash;

                    connection.query('INSERT INTO users SET ?', params, (err, result) => {
                        connection.release();
                        if(!err) {
                            res.json({error : false, message : "Inscription réussie."})
                        } else {
                            res.json({error : true, message : "Inscription echouée."})
                            console.log(err);
                        }
                    })
                }
            })

        })
    })

    app.get("/logout", (req, res) => {
        res.clearCookie("userId");
        if(req.session) {
            req.session.destroy((err) => {
                if(err) {
                    res.send("Impossible de se déconnecter.")
                } else {
                    res.send("Déconnexion.");
                }
            })
        }
    })

    app.get("/isAuth", authenticateJWT, (req, res) => {
        res.json({auth : true, role : req.user.role})
    })
}