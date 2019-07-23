module.exports = function (sequelize, DataTypes) {
  return sequelize.define('profile', {
    artist: DataTypes.STRING,
    url: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    owner: DataTypes.INTEGER
  });
}