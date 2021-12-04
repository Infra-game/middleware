const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessTokenSecret = "H&S.Qny^&~D4xQ4enjnUo)or_%r@ke";
const authenticateJWT = require("./authenticateJWT")

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
                                const accessToken = jwt.sign({id: result[0].id, username: result[0].username, role: result[0].role}, accessTokenSecret);
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

    app.get("/isAdmin", authenticateJWT, (req, res) => {
        if(req.user.role.toLowerCase()==="admin") {
            res.json({auth:true})
        } else {
            res.json({auth: false, message: "Identifiants administrateurs requis."})
        }
    })

    app.get("/isUser", authenticateJWT, (req, res) => {
        if(req.user.role.toLowerCase()==="user") {
            res.json({auth:true})
        } else {
            res.json({auth: false, message: "Identifiants requis."})
        }
    })
}