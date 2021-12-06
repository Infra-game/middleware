const request = require('request');
let options = {
    url : "",
    method: 'HEAD',
    auth: {
        'user': 'JobApi',
        'pass': '115ab7751cfff403f0848fc529461a4d07'
    }
};

module.exports = (app) => {
    app.get("/games/:gameName/start", (req,res) => {    
        options.url = 'http://192.168.68.91:8080/job/Prod/job/Launch%20Docker%20Test/build?token=12345'
        request(options, (err, response) => {
            if(!err) {
                const statusCode = response.statusCode;
                let message = "";
                switch (statusCode) {
                    case 201:
                        message = "Le serveur a été crée."
                        break;
                    case 401:
                        message = "Non autorisé."
                    default:
                        break;
                }
                res.json({statusCode, message})
            } else {
                res.json({error : true})
                console.log(err);
            }
        });
    })

    app.get("/games/:gameName/destroy", (req,res) => {
        options.url = "http://192.168.68.91:8080/job/Prod/job/Remove%20Docker%20test/build?token=123456"
        request(options, (err, response) => {
            if(!err) {
                const statusCode = response.statusCode;
                let message = "";
                switch (statusCode) {
                    case 201:
                        message = "Le serveur a été détruit."
                        break;
                    case 401:
                        message = "Non autorisé."
                    default:
                        break;
                }
                res.json({statusCode, message})
            } else {
                res.json({error : true})
                console.log(err);
            }
        });
    })
    
}