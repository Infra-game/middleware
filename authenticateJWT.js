const jwt = require("jsonwebtoken");
const accessTokenSecret = "H&S.Qny^&~D4xQ4enjnUo)or_%r@ke";

module.exports = authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, accessTokenSecret, (err, user) => {
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