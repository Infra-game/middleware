const request = require("request");

let options = {
  url: "",
  method: "HEAD",
};

module.exports = (app) => {
  /** options
   * nonzero = n'affiche pas les
   * points = nombre de points max
   * json =  format
   * google_json = format
   * after => give the time for getting data (seconds)
   *  */

  //get avg  load stats for %

  app.post("/monitoring/cpu", (req, res) => {
    params = {
      points : req.body.points,
      after : req.body.after
    }

    options.url = `${process.env.NETDATA_URL}options=nonzero&chart=system.cpu&points=${params.points}&format=json&options=objectrows&after=-${params.after}`;
    request.get(options, (error, response) => {
      if (!error) {
        res.send(response.body);
      } else {
        res.send(error);
      }
    });
  });
  //get avg  load stats for %
  app.post("/monitoring/load", (req, res) => {
    params = {
      points : req.body.points,
      after : req.body.after
    }

    options.url = `${process.env.NETDATA_URL}options=nonzero&chart=system.load&points=${params.points}&format=json&options=objectrows&after=-${params.after}`;
    request.get(options, (error, response) => {
      if (!error) {
        res.send(response.body);
      } else {
        res.send(error);
      }
    });
  });
  //get ram  load stats for %
  app.get("/monitoring/ram", (req, res) => {
    params = {
      points : req.body.points,
      after : req.body.after
    }

    options.url = `${process.env.NETDATA_URL}options=nonzero&chart=system.ram&points=1&format=json&options=objectrows&after=-5`;
    request.get(options, (error, response) => {
      if (!error) {
        res.send(response.body);
      } else {
        res.send(error);
      }
    });
  });
};
