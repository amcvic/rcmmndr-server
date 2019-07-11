module.exports = function (sequelize, DataTypes) {
  return sequelize.define('profile', {
    artists: DataTypes.ARRAY(DataTypes.STRING),
    owner: DataTypes.INTEGER
  });
}