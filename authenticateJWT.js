const jwt = require("jsonwebtoken");


module.exports = authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.BCRYPT_SECRET, (err, user) => {
            if (err) {
                res.json({error : true, message : "Jeton faux."})
            } else {
                req.user = user;
                next();
            }

        });
    } else {
        res.json({error : true, message : "Aucun jeton fourni."});
    }
};