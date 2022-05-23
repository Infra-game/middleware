const request = require("request");
const qs = require("qs");

let options = {
  url: "",
  method: "HEAD",
  auth: {
    user: process.env.JOB_USER,
    pass: process.env.JOB_TOKEN,
  },
  data: ""
};

module.exports = (app) => {
  app.post("/games/:gameName/start", (req, res) => {
    options.url = `${process.env.JENKINS_URL}/job/Prod/job/start-docker-${req.params.gameName}/build?token=12345`;

    request(options, (err, response) => {
      if (!err) {
        const statusCode = response.statusCode;
        let message = "";
        switch (statusCode) {
          case 201:
            message = "Le serveur a été crée.";
            break;
          case 401:
            message = "Non autorisé.";
            break;
          case 405:
            message = "Method not allowed";
            break;
          default:
            break;
        }
        res.json({ statusCode, message });
      } else {
        res.json({ error: true });
        console.log(err);
      }
    });
  });

  app.get("/games/:gameName/status", (req, res) => {
    options.url = `${process.env.JENKINS_URL}/job/Prod/job/start-docker-${req.params.gameName}/lastBuild/api/json?pretty=true`;
    request.get(options, (err, response) => {
      if (!err) {
        let status = JSON.parse(response.body);
        res.send(status.result);
      } else {
        res.send(err);
      }
    });
  });

  app.get("/games/:gameName/destroy", (req, res) => {
    options.url = `${process.env.JENKINS_URL}/job/Prod/job/stop-docker-${req.params.gameName}/build?token=12345`;
    request(options, (err, response) => {
      if (!err) {
        const statusCode = response.statusCode;
        let message = "";
        switch (statusCode) {
          case 201:
            message = "Le serveur a été détruit.";
            break;
          case 401:
            message = "Non autorisé.";
          default:
            break;
        }
        res.json({ statusCode, message });
      } else {
        res.json({ error: true });
        console.log(err);
      }
    });
  });

  app.post("/testconfig", (req, res) => {
    /*let parameters = {
      "player_num" : "15",
      "server_name" : req.body.name,
      "motd" : req.body.motd,
      "online_mode" : "false",
      "difficulty" : req.body.difficulty
    }*/
    let parameters = {
      "FLIGHT" : "true",
      "NAME" : "mehdi-mc",
      "MODE" : "Survival",
      "MOTD" : "Ouais ouais description"
    }
    strParams = "";
    Object.entries(parameters).forEach((entry) => {
      strParams+=`&${entry[0]}=${entry[1]}`;
    });
    options.url = `${process.env.JENKINS_URL}/job/test-deploy/job/test-k3s-deploy/buildWithParameters?token=12345${strParams}`;

    request(options, (err, response) => {
      if (!err) {
        const statusCode = response.statusCode;
        let message = "";
        console.log(response.body);
        switch (statusCode) {
          case 201:
            message = "Le serveur a été crée.";
            break;
          case 401: //Changer le token de l'utilisateur
            message = "Non autorisé.";
            break;
          case 405: //Vérifier le token du job
            message = "Method not allowed";
            break;
          default:
            break;
        }
        res.json({ statusCode, message });
      } else {
        res.json({ error: true });
        console.log(err);
      }
    });
  })

  app.post("/testdestroy", (req, res) => {
    let parameters = {
      "NAME" : "mehdi-mc"
    }
    strParams = "";
    Object.entries(parameters).forEach((entry) => {
      strParams+=`&${entry[0]}=${entry[1]}`;
    });
    options.url = `${process.env.JENKINS_URL}/job/test-deploy/job/delete%20test/buildWithParameters?token=12345${strParams}`;
  
    request(options, (err, response) => {
      if (!err) {
        const statusCode = response.statusCode;
        let message = "";
        switch (statusCode) {
          case 201:
            message = "Le serveur a été supprimé.";
            break;
          case 401: //Changer le token de l'utilisateur
            message = "Non autorisé.";
            break;
          case 405: //Vérifier le token du job
            message = "Method not allowed";
            break;
          default:
            break;
        }
        res.json({ statusCode, message });
      } else {
        res.json({ error: true });
        console.log(err);
      }
    });
  })
};
