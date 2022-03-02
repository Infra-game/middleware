const request = require("request");

let options = {
  url: "",
  method: "HEAD",
};

module.exports = (app) => {
  /** options
   * nonzero = n'affiche pas les
   * points = nombre de points max
   * jsonp =  format
   * google_json = format
   * after => give the time for getting data (seconds)
   *  */

  //get avg  load stats for %
  app.post("/monitoring/cpu", (req, data) => {
    params = {
      points : req.body.points,
      after : req.body.after
    }

    options.url = `${process.env.NETDATA_URL}options=nonzero&chart=system.cpu&points=${params.points}&format=jsonp&options=google_json&after=-${params.after}`;
    request.get(options, (error, response) => {
      if (!error) {
        data.send(response.body);
      } else {
        data.send(error);
      }
    });
  });
  //get avg  load stats for %
  app.post("/monitoring/load", (req, data) => {
    params = {
      points : req.body.points,
      after : req.body.after
    }

    options.url = `${process.env.NETDATA_URL}options=nonzero&chart=system.load&points=${params.points}&format=jsonp&options=google_json&after=-${params.after}`;
    request.get(options, (error, response) => {
      if (!error) {
        data.send(response.body);
      } else {
        data.send(error);
      }
    });
  });
  //get ram  load stats for %
  app.post("/monitoring/ram", (req, data) => {
    params = {
      points : req.body.points,
      after : req.body.after
    }

    options.url = `${process.env.NETDATA_URL}options=nonzero&chart=system.ram&points=${params.points}&format=jsonp&options=google_json&after=-${params.after}`;
    request.get(options, (error, response) => {
      if (!error) {
        data.send(response.body);
      } else {
        data.send(error);
      }
    });
  });
  //get disk  load stats for %
  app.post("/monitoring/disk", (req, data) => {
    params = {
      points : req.body.points,
      after : req.body.after
    }
    
    options.url = `${process.env.NETDATA_URL}options=nonzero&chart=disk.sda&points=${params.points}&format=jsonp&options=google_json&after=-${params.after}`;
    request.get(options, (error, response) => {
      if (!error) {
        data.send(response.body);
      } else {
        data.send(error);
      }
    });
  });
};
