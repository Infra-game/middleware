const { json } = require('express');
const request = require('request');
let options = {
    url : "",
    method: 'HEAD',
    auth: {
        'user': process.env.JOB_USER,
        'pass': process.env.JOB_TOKEN
    }
};
module.exports = (app) => {
    app.get("/games/:gameName/start", (req,res) => {
        options.url = `${process.env.JENKINS_URL}/job/Prod/job/start-docker-${req.params.gameName}/build?token=12345`
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

    app.get("/games/:gameName/status", (req,res) => {
        options.url = `${process.env.JENKINS_URL}/job/Prod/job/start-docker-${req.params.gameName}/lastBuild/api/json?pretty=true`
        request.get(options, (err, response) => {
            if (!err){                
                let status = JSON.parse(response.body)
                res.send(status.result)
            }
	        else {
	            res.send(err) ; 
	        }	
        })
    })  

    app.get("/games/:gameName/destroy", (req,res) => {
        options.url = `${process.env.JENKINS_URL}/job/Prod/job/stop-docker-${req.params.gameName}/build?token=12345`
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
