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
   * after => give the time for getting data
   *  */

  //get avg  load stats for %
  app.get("/monitoring/cpu", (req, data) => {
    options.url = `${process.env.NETDATA_URL}options=nonzero&chart=system.cpu&points=10&format=jsonp&options=google_json&after=-10`;
    request.get(options, (error, response) => {
      if (!error) {
        data.send(response.body);
      } else {
        data.send(error);
      }
    });
  });
  //get avg  load stats for %
  app.get("/monitoring/load", (req, data) => {
    options.url = `${process.env.NETDATA_URL}options=nonzero&chart=system.load&points=10&format=jsonp&options=google_json&after=-10`;
    request.get(options, (error, response) => {
      if (!error) {
        data.send(response.body);
      } else {
        data.send(error);
      }
    });
  });
  //get ram  load stats for %
  app.get("/monitoring/ram", (req, data) => {
    options.url = `${process.env.NETDATA_URL}options=nonzero&chart=system.ram&points=10&format=jsonp&options=google_json&after=-10`;
    request.get(options, (error, response) => {
      if (!error) {
        data.send(response.body);
      } else {
        data.send(error);
      }
    });
  });
  //get disk  load stats for %
  app.get("/monitoring/disk", (req, data) => {
    options.url = `${process.env.NETDATA_URL}options=nonzero&chart=disk.sda&points=10&format=jsonp&options=google_json&after=-10`;
    request.get(options, (error, response) => {
      if (!error) {
        data.send(response.body);
      } else {
        data.send(error);
      }
    });
  });
};
