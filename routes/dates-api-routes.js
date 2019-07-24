var db = require("../models");

module.exports = function(app) {
  app.get("/api/dates", function(req, res) {
    db.Date.findAll({}).then(function(dbDate) {
      res.json(dbDate);
    });
  });

  app.post("/api/dates", function(req, res) {
    db.Date.create(req.body).then(function(dbDate) {
      res.json(dbDate);
    });
  });

  app.delete("/api/dates", function(req, res) {
    db.Date.destroy({ where: { id: req.params.id } }).then(function(dbDate) {
      res.json(dbDate);
    });
  });
};
