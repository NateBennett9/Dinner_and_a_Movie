var db = require("../models");

module.exports = function(app) {
  app.get("/api/restaurants", function(req, res) {
    db.Restaurant.findAll({}).then(function(dbRestaurant) {
      res.json(dbRestaurant);
    });
  });

  app.post("/api/restaurants", function(req, res) {
    db.Restaurant.create(req.body).then(function(dbRestaurant) {
      res.json(dbRestaurant);
    });
  });

  app.delete("/api/restaurants/:id", function(req, res) {
    db.Restaurant.destroy({ where: { id: req.params.id } }).then(function(
      dbRestaurant
    ) {
      res.json(dbRestaurant);
    });
  });
};
