module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define("Movie", {
    movieTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    }
  });
  Movie.associate = function(models) {
    Movie.hasMany(models.Date, {
      onDelete: "cascade"
    });
  };
  return Movie;
};
