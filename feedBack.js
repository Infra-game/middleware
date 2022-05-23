module.exports = (app, db) => {
  app.post("/feedback", (req, res) => {
    db.getConnection((error, connection) => {
      if (error) res.json(error);
      else {
        const params = {
          bugType: req.body.bugType,
          bugMessage: req.body.bugMessage,
        };
        console.log(req.body);
        connection.query(`INSERT INTO bugreport SET ?`, [params], (err) => {
          connection.release();
          if (!err) {
            res.send("Le feedback a été enregistré.");
          } else {
            res.send(error);
          }
        });
      }
    });
  });

  app.get("/feedback", (req, res) => {
    db.getConnection((error, connection) => {
      if (error) res.json(error);
      else {
        connection.query(
          `SELECT * FROM bugreport WHERE status=1`,
          (err, result) => {
            if (!err) {
              res.send(result);
            } else {
              res.send(err);
              console.log(err);
            }
          }
        );
      }
    });
  });

  app.put("/feedback/validate/:id", (req, res) => {
    db.getConnection((error, connection) => {
      if (error) res.json(error);
      else {
          connection.query(
              `UPDATE bugreport SET status=0 WHERE id = ?`,
              [req.params.id],
              (err) => {
                  if(!err) {
                      res.send("Le bug a été traité.")
                  } else {
                      res.send(err);
                  }
              }
          )
      }
    });
  });
};
