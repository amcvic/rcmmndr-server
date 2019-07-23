module.exports = function (sequelize, DataTypes) {
  return sequelize.define('image', {
    artist: DataTypes.STRING,
    img: DataTypes.STRING
  });
}