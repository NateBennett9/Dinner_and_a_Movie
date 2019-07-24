module.exports = function(sequelize, DataTypes) {
  var DateNight = sequelize.define("Date", {
    dateName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  DateNight.associate = function(models) {
    DateNight.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    DateNight.belongsTo(models.Movie, {
      foreignKey: {
        allowNull: false
      }
    });
    DateNight.belongsTo(models.Restaurant, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return DateNight;
};
