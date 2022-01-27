const request = require('request');

module.exports = (app) => {
    app.get("/monitoring/cpu", (request,data) =>{
    url= `${process.env.JENKINS_URL}/api/v1/data?options=nonzero&chart=system.cpu&points=10&format=jsonp&options=google_json&after=-10`
        request.get(url, (err, response , body) => {
            console.log(body) ;
        })
    })
}