module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define("Restaurant", {
    restaurantName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  Restaurant.associate = function(models) {
    Restaurant.hasMany(models.Date, {
      onDelete: "cascade"
    });
  };
  return Restaurant;
};
